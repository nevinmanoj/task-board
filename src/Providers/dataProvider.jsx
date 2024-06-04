import React from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const dataContext = React.createContext();
import { server } from "../constants";
export const DataProvider = ({ children }) => {
  const [jwtToken, setJwtToken] = React.useState(null);
  const [name, setName] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [pic, setPic] = React.useState(null);
  const [tokenExpiryTime, setTokenExpiryTime] = React.useState(0);

  const [tasks, setTasks] = React.useState([]);

  React.useEffect(() => {
    if (!jwtToken && tokenExpiryTime > Math.floor(Date.now() / 1000)) {
      var token = localStorage.getItem("token");
      setJwtToken(token);
      decodeAndSetTokenDetails(token);
    }

    if (tokenExpiryTime < Math.floor(Date.now() / 1000)) {
      logout();
    }
  }, []);
  const decodeAndSetTokenDetails = (token) => {
    const decoded = jwtDecode(token);
    setName(decoded["name"]);
    setEmail(decoded["email"]);
    setPic(decoded["pic"]);
    setTokenExpiryTime(decoded["exp"]);
  };

  const login = async (response) => {
    axios
      .post(server + "/auth/login", {
        tokenId: response.credential,
      })
      .then((res) => res.data)
      .then((data) => {
        decodeAndSetTokenDetails(data.accessToken);
        localStorage.setItem("token", data.accessToken);
        setJwtToken(data.accessToken);
      })
      .catch((error) => {
        console.error("Authentication Error:", error);
      });
  };
  const logout = () => {
    setJwtToken(null);
    setName(null);
    setEmail(null);
    setPic(null);
    setTokenExpiryTime(0);
    setTasks([]);
    localStorage.clear();
  };

  const getAllTasks = () => {
    setTasks([]);
  };
  return (
    <dataContext.Provider
      value={{
        jwtToken,
        pic,
        email,
        name,
        logout,
        login,
      }}
    >
      {children}
    </dataContext.Provider>
  );
};
