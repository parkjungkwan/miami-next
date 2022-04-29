import React, { useEffect } from "react";
import Router from "next/router";
import { useSelector } from 'react-redux';
import { Profile } from "@/components/user/Profile";
const ProfilePage = () => {
    const {loginUser} = useSelector(state => state.login)
    useEffect(() => {
        if (!(loginUser && loginUser.userid)) {
          // Router.push('/');
          console.log( " 왜 ? ")
        }
      }, [loginUser && loginUser.userid]);
      if (!loginUser) {
        return null;
      }
    return (<Profile loginUser={loginUser}/>)
}
export default ProfilePage