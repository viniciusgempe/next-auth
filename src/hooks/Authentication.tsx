import { createContext, useEffect, useState } from "react";
import Router from "next/router";
import { setCookie, parseCookies } from "nookies";

import { recoverUser, signRequest, SignRequestType } from "../services/auth";
import { api } from "../api";

interface UserType {
  name: string;
  email: string;
  avartar_url: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  signIn: (data: SignRequestType) => Promise<void>;
  user: UserType;
}

export const AuthenticationContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<UserType | null>();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { "nextAuth.token": token } = parseCookies();

    if (token) {
      recoverUser().then((user) => {setUser(user)});
    }
  });

  const signIn = async ({ email, password }: SignRequestType) => {
    const { token, user } = await signRequest({
      email,
      password,
    });

    setCookie(undefined, "nextAuth.token", token, {
      maxAge: 60 * 60 * 1,
    });

    api.defaults.headers["Authorization"] = `Bearer ${token}`;

    setUser(user);

    Router.push("/dashboard");
  };

  return (
    <AuthenticationContext.Provider value={{ isAuthenticated, signIn, user }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
