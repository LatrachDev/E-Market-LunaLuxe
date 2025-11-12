// src/pages/Admin/UserManagement.jsx
import React, { useEffect } from "react";
import { useUsers } from "../../hooks/useUsers";

export default function UserManagement() {
  const { users, loading, error, fetchUsers } = useUsers();

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Chargement des utilisateurs...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div className="rounded-3xl border border-brandRed/10 bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-semibold font-playfair text-gray-900 mb-4">
        Gestion des utilisateurs
      </h2>

      {users.length === 0 ? (
        <p>Aucun utilisateur trouvé.</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border-b">Nom</th>
              <th className="p-3 border-b">Email</th>
              <th className="p-3 border-b">Rôle</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{user.fullname}</td>
                <td className="p-3 border-b">{user.email}</td>
                <td className="p-3 border-b">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
