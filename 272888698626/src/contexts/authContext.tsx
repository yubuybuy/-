import { createContext, useState, ReactNode, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  username: string;
  setIsAuthenticated: (value: boolean, username?: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isAdmin: false,
  username: '',
  setIsAuthenticated: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');

  // 初始化时检查本地存储的登录状态
  useEffect(() => {
    const savedAuth = localStorage.getItem('admin_logged_in');
    const savedUser = localStorage.getItem('admin_username');
    
    if (savedAuth === 'true' && savedUser) {
      setIsAuthenticated(true);
      setIsAdmin(true);
      setUsername(savedUser);
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    // 模拟管理员登录验证
    if (username === 'admin' && password === 'password123') {
      setIsAuthenticated(true);
      setIsAdmin(true);
      setUsername(username);
      localStorage.setItem('admin_logged_in', 'true');
      localStorage.setItem('admin_username', username);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUsername('');
    localStorage.removeItem('admin_logged_in');
    localStorage.removeItem('admin_username');
  };

  const setAuthStatus = (value: boolean, username?: string) => {
    setIsAuthenticated(value);
    setIsAdmin(value);
    if (username) {
      setUsername(username);
      localStorage.setItem('admin_username', username);
    }
    localStorage.setItem('admin_logged_in', value.toString());
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAdmin,
        username,
        setIsAuthenticated: setAuthStatus,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};