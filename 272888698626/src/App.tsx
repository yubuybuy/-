import { Routes, Route, Navigate } from "react-router-dom";
import Home from "@/pages/Home";
import { useContext } from "react";
import { AuthContext, AuthProvider } from '@/contexts/authContext.tsx';
import AdminLogin from "@/pages/Admin/Login";
import ResourceManagement from "@/pages/Admin/ResourceManagement";

// 受保护的路由组件
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isAdmin } = useContext(AuthContext);
  
  // 检查用户是否已登录且是管理员
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return <>{children}</>;
};

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resource/:id" element={<div className="text-center text-xl">资源详情页 - 开发中</div>} />
        <Route path="/other" element={<div className="text-center text-xl">其他页面 - 开发中</div>} />
        
        {/* 管理员路由 */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route 
          path="/admin/resources" 
          element={
            <PrivateRoute>
              <ResourceManagement />
            </PrivateRoute>
          } 
        />
        <Route path="/admin/*" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    </AuthProvider>
  );
}
