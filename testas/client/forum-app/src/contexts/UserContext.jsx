import { createContext, useState } from "react";

import { LOGIN_PATH } from "../routes/consts";
import { toast } from "react-hot-toast";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("userObject", null);
  const [userObject, setUserObject] = useState("");
  const navigate = useNavigate();
  const isLoggedIn = !!user;

  if (!userObject) {
    const storage = JSON.parse(localStorage.getItem("userObject") || "{}");
    if (storage !== null) {
      setUserObject(JSON.parse(localStorage.getItem("userObject") || "{}"));
    }
  }

  const handleLogOut = () => {
    setUser(null);
    setUserObject("");
    toast.error('Logout')
    navigate(LOGIN_PATH);
  };

  const handleLogIn = (user) => {
    setUserObject(user);
    setUser(user);
  };

  return (
    <UserContext.Provider
      value={{ user, isLoggedIn, setUser, handleLogOut, handleLogIn, userObject }}>
      {children}
    </UserContext.Provider>
  );
};
export { UserContext, UserProvider };