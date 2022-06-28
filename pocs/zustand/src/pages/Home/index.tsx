import React from "react";
import useUserStore, { Usertype } from "../../stores/user";

function Home() {
  const users = useUserStore((state) => state.users);
  return (
    <div>
      {users?.map((user: Usertype) => (
        <p key={Math.random()}>
          {user.name} | {user.email}
        </p>
      ))}
    </div>
  );
}

export default Home;
