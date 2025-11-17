import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import API_ENDPOINTS, { api } from "../config/api";

// const API_URL = "http://localhost:3000/api/users";

// export const useUsers = () => {
//   const queryClient = useQueryClient();

//   // Fetch utilisateurs
//   const { data, isLoading, isError } = useQuery(["users"], async () => {
//     const response = await axios.get(API_URL);
//     return response.data;
//   });

//   // Modifier un utilisateur
//   const updateUser = useMutation(
//     async ({ id, payload }) => {
//       const response = await axios.patch(`${API_URL}/${id}`, payload);
//       return response.data;
//     },
//     {
//       onSuccess: () => queryClient.invalidateQueries(["users"]),
//     }
//   );

//   // Supprimer un utilisateur
//   const deleteUser = useMutation(
//     async (id) => {
//       await axios.delete(`${API_URL}/${id}`);
//     },
//     {
//       onSuccess: () => queryClient.invalidateQueries(["users"]),
//     }
//   );

//   return { data, isLoading, isError, updateUser, deleteUser };
// };
export function useUsers(page = 1) {
  return useQuery({
    queryKey: ["users", page],
    queryFn: async () => {
      const res = await api.get(`/users?page=${page}`);
      return res.data.data;
    },
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  });
}

// CREATE
export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user) => api.post("/users", user),
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  });
}

// UPDATE
export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => api.put(`/users/${id}/role`, data),
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  });
}

// DELETE
export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => api.delete(`/users/${id}`),
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  });
}