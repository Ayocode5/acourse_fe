import React from "react";
import { useAppSelector } from "../../../hooks/useRedux";

const Profile = (): JSX.Element => {
  const { user } = useAppSelector((state: any) => state.auth);

  return (
    <>
      <h1>Profile</h1>
      <p>User : {user?.username}</p>
      <p>email : {user?.email}</p>
    </>
  );
};

export default Profile;
