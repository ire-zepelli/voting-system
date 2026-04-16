import React, { useEffect, useState } from "react";
import { apiRequest } from "../lib/api";
import { AuthContext } from "./auth-context";
const STORAGE_KEY = "psits-voting-session";

function getStoredToken() {
  return window.localStorage.getItem(STORAGE_KEY);
}

function persistToken(token) {
  if (token) {
    window.localStorage.setItem(STORAGE_KEY, token);
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getStoredToken());
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    async function bootstrapSession() {
      if (!token) {
        if (isActive) {
          setUser(null);
          setIsLoading(false);
        }
        return;
      }

      try {
        const data = await apiRequest("/api/auth/me", { token });

        if (isActive) {
          setUser(data.user);
        }
      } catch {
        if (isActive) {
          persistToken(null);
          setToken(null);
          setUser(null);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    bootstrapSession();

    return () => {
      isActive = false;
    };
  }, [token]);

  async function authenticate(path, credentials) {
    const data = await apiRequest(path, {
      method: "POST",
      body: credentials,
    });

    persistToken(data.token);
    setToken(data.token);
    setUser(data.user);

    return data.user;
  }

  async function refreshUser(nextToken = token) {
    if (!nextToken) {
      setUser(null);
      return null;
    }

    const data = await apiRequest("/api/auth/me", { token: nextToken });
    setUser(data.user);
    return data.user;
  }

  function logout() {
    persistToken(null);
    setToken(null);
    setUser(null);
  }

  const value = {
    user,
    token,
    isLoading,
    isAuthenticated: Boolean(token && user),
    login: (credentials) => authenticate("/api/auth/login", credentials),
    refreshUser,
    updateUser: setUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
