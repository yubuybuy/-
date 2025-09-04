import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AuthContext } from '@/contexts/authContext';
import { cn } from '@/lib/utils';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login, isAuthenticated, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // 如果已经登录且是管理员，重定向到资源管理页面
  if (isAuthenticated && isAdmin) {
    navigate('/admin/resources');
    return null;
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('请输入用户名和密码');
      return;
    }
    
    setIsLoading(true);
    
    // 模拟登录延迟
    setTimeout(() => {
      const success = login(username, password);
      
      if (success) {
        toast.success('登录成功，欢迎回来！');
        navigate('/admin/resources');
      } else {
        setError('用户名或密码不正确');
        toast.error('登录失败，请检查您的凭证');
      }
      
      setIsLoading(false);
    }, 800);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--light-bg)] to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] p-6 text-white text-center">
            <i className="fa-solid fa-lock text-3xl mb-3"></i>
            <h2 className="text-2xl font-bold">管理员登录</h2>
            <p className="text-white/80 text-sm mt-1">请输入管理员账号以访问管理后台</p>
          </div>
          
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center">
                  <i className="fa-solid fa-exclamation-circle mr-2"></i>
                  {error}
                </div>
              )}
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="username">
                  用户名
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fa-solid fa-user text-gray-400"></i>
                  </div>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
                    placeholder="输入管理员用户名"
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
                  密码
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fa-solid fa-key text-gray-400"></i>
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
                    placeholder="输入管理员密码"
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className={cn(
                  "w-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center",
                  isLoading ? "opacity-80 cursor-not-allowed" : "hover:shadow-lg hover:shadow-[var(--primary)]/20"
                )}
              >
                {isLoading ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                    登录中...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-sign-in-alt mr-2"></i>
                    登录管理后台
                  </>
                )}
              </button>
            </form>
            
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>管理员账户信息：</p>
              <p className="font-mono bg-gray-100 px-2 py-1 rounded inline-block mt-1">用户名: admin</p>
              <span className="mx-2">|</span>
              <p className="font-mono bg-gray-100 px-2 py-1 rounded inline-block">密码: password123</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-center text-gray-500 text-sm">
          <p>不是管理员？<a href="/" className="text-[var(--primary)] hover:underline">返回首页</a></p>
        </div>
      </div>
    </div>
  );
}