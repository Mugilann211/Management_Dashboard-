import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { User } from "../types/User";

interface UserFormProps {
  user: User | null;
  onSave: (user: User) => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSave }) => {
  const { register, handleSubmit, reset } = useForm<User>();

  // Reset the form when the `user` prop changes
  useEffect(() => {
    if (user) {
      reset(user); // Populate form fields with the user's data
    } else {
      reset({ id: 0, name: "", email: "", role: "" }); // Clear form if no user is being edited
    }
  }, [user, reset]);

  const onSubmit = (data: User) => {
    onSave(data); // Pass user data to parent
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" {...register("name", { required: true })} />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" {...register("email", { required: true })} />
      </div>
      <div>
        <label htmlFor="role">Role</label>
        <select id="role" {...register("role", { required: true })}>
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </select>
      </div>
      <button type="submit">{user ? "Update User" : "Add User"}</button>
    </form>
  );
};

export default UserForm;
