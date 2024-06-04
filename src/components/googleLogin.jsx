import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useContext } from "react";
import { dataContext } from "../Providers/dataProvider";

export const GoogleLoginComponent = () => {
  const { login } = useContext(dataContext);
  const clientId = import.meta.env.VITE_CLIENT_ID;
  if (!clientId) {
    clientId = "testing";
  }
  console.log(import.meta.env.REACT_APP_HELLO);
  const onSuccess = (response) => {
    console.log(response);
    login(response);
  };

  const onError = (error) => {
    console.error("Login Failed:", error);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onError={onError}
      />
    </GoogleOAuthProvider>
  );
};
