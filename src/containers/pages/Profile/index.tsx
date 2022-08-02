import React, { useState, useEffect } from "react";
import axios from "../../../api/user-api";

const Profile = (): JSX.Element => {
  const [profile, setProfile] = useState({});

  const getCurrentProfile = async () => {
    const res = await axios.get(`${process.env.REACT_APP_USER_API_CURRENT}`);

    if (res.status === 200) {
      setProfile(res.data);
    }
  };

  useEffect(() => {
    try {
      getCurrentProfile();
      console.log(profile);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return <div>Profile</div>;
};

export default Profile;
