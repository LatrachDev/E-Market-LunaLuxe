import { useState } from "react";

export default function UserTable({ users, onUpdate, onDelete, page, setPage, totalPages }) {
  const [editingId, setEditingId] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");

  const handleEditClick = (user) => {
    setEditingId(user._id);
    setSelectedRole(user.role);
  };

  const handleSave = (userId) => {
    onUpdate({ id: userId, role: selectedRole });
    setEditingId(null);
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-violet-500';
      case 'seller':
        return 'bg-orange-500';
      default:
        return 'bg-cyan-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-8">
      <div className="max-w-7xl mx-auto">

        <div className="grid gap-4">
          {users.map((user) => (
            <div 
              key={user._id} 
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 flex-1">
                  <div className="relative">
                    <img
                      src={
                        user.avatar
                          ? `${import.meta.env.VITE_BASE_URL}${user.avatar}`
                          : "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80"
                      }
                      alt={user.name || "Avatar"}
                      className="w-16 h-16 rounded-full object-cover ring-4 ring-gray-100"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-4 border-white ${getRoleColor(user.role)}`}></div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{user.fullname}</h3>
                    <p className="text-gray-500 text-sm truncate">{user.email}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    {editingId === user._id ? (
                      <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="bg-gray-50 border-2 border-indigo-200 text-gray-900 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      >
                        <option value="user">User</option>
                        <option value="seller">Seller</option>
                        <option value="admin">Admin</option>
                      </select>
                    ) : (
                      <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full">
                        <div className={`w-2 h-2 rounded-full ${getRoleColor(user.role)}`}></div>
                        <span className="text-gray-700 text-sm font-semibold uppercase tracking-wider">
                          {user.role}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 ml-6">
                  {editingId === user._id ? (
                    <>
                      <button
                        onClick={() => handleSave(user._id)}
                        className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                        Sauvegarder
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all duration-200"
                      >
                        Annuler
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditClick(user)}
                        className="p-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-xl transition-all duration-200"
                        title="Modifier"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => onDelete(user._id)}
                        className="p-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all duration-200"
                        title="Supprimer"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-8 bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white rounded-xl font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Précédent
          </button>
          
          <div className="flex items-center gap-3">
            <span className="text-gray-500 font-medium">Page</span>
            <span className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-bold rounded-xl shadow-md min-w-[3.5rem] text-center">
              {page}
            </span>
            <span className="text-gray-400 font-medium">/</span>
            <span className="px-5 py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-xl min-w-[3.5rem] text-center">
              {totalPages}
            </span>
          </div>

          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white rounded-xl font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Suivant
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}