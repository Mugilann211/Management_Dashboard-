import React, { useState } from "react";
import { User } from "../types/User";
import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  ]);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // Save or update user
  const handleSaveUser = (user: User) => {
    if (editingUser) {
      // Update existing user
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...user } : u))
      );
    } else {
      // Add new user
      setUsers((prev) => [...prev, { ...user, id: Date.now() }]);
    }
    setEditingUser(null); // Reset editing user
  };

  // Edit user
  const handleEditUser = (user: User) => {
    setEditingUser(user); // Set the user to be edited
  };

  // Delete user
  const handleDeleteUser = (id: number) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div>
      <h1>User Management Dashboard</h1>
      <UserForm user={editingUser} onSave={handleSaveUser} />
      <UserTable
        users={users}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />
    </div>
  );
};

export default Dashboard;
