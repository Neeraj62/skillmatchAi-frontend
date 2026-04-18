import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { authService, candidateService, recruiterService } from "../services";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const STORAGE_KEY = "auth_user";
  const TOKEN_KEY = "auth_token";

  const fetchUserProfile = async (currentUser) => {
    if (!currentUser) return;

    try {
      if (currentUser.role === "candidate" && !currentUser.avatarUrl) {
        const profileRes = await candidateService.getProfile(currentUser._id);
        if (profileRes.data?.avatarUrl) {
          const updatedUser = { ...currentUser, avatarUrl: profileRes.data.avatarUrl };
          setUser(updatedUser);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
        }
      } else if (currentUser.role === "recruiter" && !currentUser.avatarUrl) {
        const profileRes = await recruiterService.getProfile(currentUser._id);
        if (profileRes.data?.companyLogoUrl) {
          const updatedUser = { ...currentUser, avatarUrl: profileRes.data.companyLogoUrl };
          setUser(updatedUser);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
        }
      }
    } catch (err) {
      console.error("Error fetching profile for avatar:", err);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const currentUser = JSON.parse(raw);
          setUser(currentUser);
          // Fetch additional profile data like avatar if missing
          await fetchUserProfile(currentUser);
        }
      } catch (err) {
        console.error("Error parsing stored user:", err);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      const { user: userData, accessToken } = response.data;
      
      setUser(userData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      localStorage.setItem(TOKEN_KEY, accessToken);
      
      // Fetch profile to get avatar after login
      await fetchUserProfile(userData);
      
      return { ok: true, user: userData };
    } catch (error) {
      return { ok: false, message: error.message || "Login failed" };
    }
  };

  const signup = async (userData) => {
    try {
      const response = await authService.signup(userData);
      const { user: newUser, accessToken } = response.data;
      
      setUser(newUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      localStorage.setItem(TOKEN_KEY, accessToken);
      
      return { ok: true, user: newUser };
    } catch (error) {
      return { ok: false, message: error.message || "Signup failed" };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(TOKEN_KEY);
    }
  };

  const value = useMemo(() => ({ user, setUser, loading, login, signup, logout }), [user, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
