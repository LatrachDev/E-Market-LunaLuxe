import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "http://localhost:3000/api/users";

export const useUsers = () => {
  const queryClient = useQueryClient();

  // Fetch utilisateurs
  const { data, isLoading, isError } = useQuery(["users"], async () => {
    const response = await axios.get(API_URL);
    return response.data;
  });

  // Modifier un utilisateur
  const updateUser = useMutation(
    async ({ id, payload }) => {
      const response = await axios.patch(`${API_URL}/${id}`, payload);
      return response.data;
    },
    {
      onSuccess: () => queryClient.invalidateQueries(["users"]),
    }
  );

  // Supprimer un utilisateur
  const deleteUser = useMutation(
    async (id) => {
      await axios.delete(`${API_URL}/${id}`);
    },
    {
      onSuccess: () => queryClient.invalidateQueries(["users"]),
    }
  );

  return { data, isLoading, isError, updateUser, deleteUser };
};
