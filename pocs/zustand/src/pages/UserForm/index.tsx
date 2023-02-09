import React from "react";
import useUserStore from "../../stores/user";

function UserForm() {
  const addUser = useUserStore((state) => state.addUser);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as any;

    const name = target.name.value;
    const email = target.email.value;

    addUser({
      name,
      email,
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name="name" placeholder="Nome" />
        <input name="email" placeholder="Email" />
        <button type="submit">Create User</button>
      </form>
    </div>
  );
}

export default UserForm;
