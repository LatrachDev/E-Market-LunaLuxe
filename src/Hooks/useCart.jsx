import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../config/api";
import { toast } from "react-toastify";
import { setCart, addItem, removeItem, updateQuantity, clearCart } from "../features/cartSlice";

export const useCart = (userId) => {
const dispatch = useDispatch();
const queryClient = useQueryClient();
const cartRedux = useSelector((state) => state.cart);

const basePath = "/cart" ;
const queryKey = ["cart", userId]; 

// Fetch panier complet
const fetchCart = async () => {
const res = await api.get(basePath, { headers: { "Cache-Control": "no-cache" } });
return res.data.data; // retourne le panier complet
};

useEffect(() => {
if (userId) {
fetchCart()
.then((cart) => dispatch(setCart(cart)))
.catch((err) => {
console.error(err);
toast.error("Impossible de charger le panier");
});
}
}, [userId]);

const invalidateCart = () => queryClient.invalidateQueries(queryKey);

// --- Add item ---
const addToCart = useMutation({
mutationFn: ({ productId, quantity }) => api.post(basePath, { productId, quantity }),
onSuccess: (res) => {
const item = {
id: res.data.item.productId._id,
productId: res.data.item.productId,
quantity: res.data.item.quantity,
_id: res.data.item._id,
};
dispatch(addItem(item));
toast.success(res.data.message || "Produit ajouté !");
},
});

// --- Update quantity ---
const updateCartItem = useMutation({
mutationFn: ({ productId, quantity }) => api.put(basePath, { productId, quantity }),
onSuccess: (_, variables) => {
// Merge quantity avec l'item existant sans toucher productId
const updatedItems = cartRedux.items.map((item) =>
item.productId._id === variables.productId
? { ...item, quantity: variables.quantity }
: item
);
dispatch(setCart({ items: updatedItems }));
toast.success("Quantité mise à jour !");
},
});

// --- Remove item ---
const removeCartItem = useMutation({
mutationFn: ({ productId }) => api.delete(basePath, { data: { productId } }),
onSuccess: (_, variables) => {
const updatedItems = cartRedux.items.filter((item) => item.productId._id !== variables.productId);
dispatch(setCart({ items: updatedItems }));
toast.success("Produit supprimé !");
},
});

// --- Clear cart ---
const clearCartMutation = useMutation({
mutationFn: () => api.delete(`${basePath}/clear`),
onSuccess: () => {
dispatch(clearCart());
toast.success("Panier vidé !");
},
});

return {
cart: cartRedux,
addToCart,
updateCartItem,
removeCartItem,
clearCart: clearCartMutation,
};
};
