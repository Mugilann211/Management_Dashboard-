import React, { useState } from "react";
import { User } from "../types/User";
import { paginate } from "../utils/pagination";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const paginatedUsers = paginate(users, page, pageSize);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button className="edit" onClick={() => onEdit(user)}>
                  Edit
                </button>
                <button className="delete" onClick={() => onDelete(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page * pageSize >= users.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserTable;
