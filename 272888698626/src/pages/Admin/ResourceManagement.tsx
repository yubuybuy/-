import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  getResources, 
  deleteResource, 
  updateResource 
} from '@/mocks/resources';
import { Resource } from '@/types/resource';
import { AuthContext } from '@/contexts/authContext';
import { cn } from '@/lib/utils';

// 资源表单组件 - 用于添加和编辑资源
const ResourceForm = ({ 
  isOpen, 
  onClose, 
  initialData, 
  onSubmit 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  initialData?: Resource; 
  onSubmit: (data: any) => void; 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    platform: 'baidu',
    resourceType: 'document',
    size: '',
    format: '',
    downloadUrl: '#',
    thumbnailUrl: '',
    tags: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 如果有初始数据（编辑模式），填充表单
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        platform: initialData.platform,
        resourceType: initialData.resourceType,
        size: initialData.size,
        format: initialData.format,
        downloadUrl: initialData.downloadUrl || '#',
        thumbnailUrl: initialData.thumbnailUrl,
        tags: initialData.tags.join(', ')
      });
    } else {
      // 重置表单
      setFormData({
        title: '',
        description: '',
        platform: 'baidu',
        resourceType: 'document',
        size: '',
        format: '',
        downloadUrl: '#',
        thumbnailUrl: '',
        tags: ''
      });
    }
  }, [initialData, isOpen]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 表单验证
    if (!formData.title || !formData.description || !formData.size || !formData.format) {
      toast.error('请填写所有必填字段');
      return;
    }
    
    // 处理标签格式
    const tags = formData.tags.split(',').map(tag => tag.trim()).filter(Boolean);
    
    setIsSubmitting(true);
    
    // 模拟提交延迟
    setTimeout(() => {
      onSubmit({
        ...formData,
        tags
      });
      
      setIsSubmitting(false);
      onClose();
    }, 800);
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 rounded-t-2xl border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-bold text-[var(--text-primary)]">
            {initialData ? '编辑资源' : '添加新资源'}
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <i className="fa-solid fa-times"></i>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                资源标题 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                placeholder="输入资源标题"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                资源大小 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                placeholder="例如: 2.5GB"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                网盘平台 <span className="text-red-500">*</span>
              </label>
              <select
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                required
              >
                <option value="baidu">百度网盘</option>
                <option value="aliyun">阿里云盘</option>
                <option value="tencent">腾讯云盘</option>
                <option value="123pan">123云盘</option>
                <option value="other">其他平台</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                资源类型 <span className="text-red-500">*</span>
              </label>
              <select
                name="resourceType"
                value={formData.resourceType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                required
              >
                <option value="document">文档</option>
                <option value="video">视频</option>
                <option value="audio">音频</option>
                <option value="software">软件</option>
                <option value="image">图片</option>
                <option value="compressed">压缩包</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                文件格式 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="format"
                value={formData.format}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                placeholder="例如: zip, mp4"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                缩略图URL
              </label>
              <input
                type="text"
                name="thumbnailUrl"
                value={formData.thumbnailUrl}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                placeholder="输入图片URL"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              下载链接
            </label>
            <input
              type="text"
              name="downloadUrl"
              value={formData.downloadUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              placeholder="输入网盘链接"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              资源描述 <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              placeholder="详细描述资源内容、特点等信息"
              required
            ></textarea>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              标签 (用逗号分隔)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
              placeholder="例如: 前端, 学习资料, React"
            />
          </div>
          
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] text-white rounded-lg hover:opacity-90 transition-colors flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i>
                  保存中...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-save"></i>
                  保存资源
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function ResourceManagement() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { logout, username } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // 加载资源数据
  const loadResources = () => {
    setIsLoading(true);
    // 模拟加载延迟
    setTimeout(() => {
      const data = getResources();
      setResources(data);
      setIsLoading(false);
    }, 500);
  };
  
  // 初始加载和刷新数据
  useEffect(() => {
    loadResources();
  }, []);
  
  // 添加新资源
  const handleAddResource = (data: Omit<Resource, 'id' | 'likeCount' | 'downloadCount' | 'uploadDate'>) => {
    const { addResource } = require('@/mocks/resources');
    const newResource = addResource(data);
    setResources([newResource, ...resources]);
    toast.success('资源添加成功！');
  };
  
  // 编辑资源
  const handleEditResource = (data: Partial<Resource>) => {
    if (!editingResource) return;
    
    const { updateResource } = require('@/mocks/resources');
    const updatedResource = updateResource(editingResource.id, data);
    
    if (updatedResource) {
      setResources(resources.map(r => r.id === updatedResource.id ? updatedResource : r));
      toast.success('资源更新成功！');
    } else {
      toast.error('更新资源失败');
    }
  };
  
  // 删除资源
  const handleDeleteResource = (id: string) => {
    if (!window.confirm('确定要删除这个资源吗？此操作不可恢复。')) {
      return;
    }
    
    const { deleteResource } = require('@/mocks/resources');
    const success = deleteResource(id);
    
    if (success) {
      setResources(resources.filter(resource => resource.id !== id));
      toast.success('资源已删除');
    } else {
      toast.error('删除资源失败');
    }
  };
  
  // 打开添加资源表单
  const openAddForm = () => {
    setEditingResource(null);
    setIsFormOpen(true);
  };
  
  // 打开编辑资源表单
  const openEditForm = (resource: Resource) => {
    setEditingResource(resource);
    setIsFormOpen(true);
  };
  
  // 过滤资源列表
  const filteredResources = resources.filter(resource => 
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // 获取平台显示名称
  const getPlatformName = (platform: string) => {
    const platformMap: Record<string, string> = {
      'baidu': '百度网盘',
      'aliyun': '阿里云盘',
      'tencent': '腾讯云盘',
      '123pan': '123云盘',
      'other': '其他平台'
    };
    return platformMap[platform] || platform;
  };
  
  // 获取资源类型显示名称
  const getResourceTypeName = (type: string) => {
    const typeMap: Record<string, string> = {
      'document': '文档',
      'video': '视频',
      'audio': '音频',
      'software': '软件',
      'image': '图片',
      'compressed': '压缩包',
      'other': '其他'
    };
    return typeMap[type] || type;
  };
  
  return (
    <div className="min-h-screen bg-[var(--light-bg)]">
      {/* 顶部导航 */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <i className="fa-solid fa-cogs text-[var(--primary)] text-2xl mr-2"></i>
              <span className="font-bold text-lg text-[var(--primary)]">资源管理后台</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <i className="fa-solid fa-user-circle text-[var(--primary)]"></i>
                <span>{username}</span>
              </div>
              
              <button 
                onClick={() => {
                  logout();
                  navigate('/');
                  toast.info('已退出登录');
                }}
                className="text-gray-600 hover:text-red-600 transition-colors"
              >
                <i className="fa-solid fa-sign-out-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* 主要内容 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[var(--text-primary)]">资源管理</h1>
              <p className="text-gray-500">管理您网站上的所有网盘资源</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索资源..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                />
                <i className="fa-solid fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>
              
              <button
                onClick={() => {
                  setEditingResource(null);
                  setIsFormOpen(true);
                }}
                className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] text-white px-5 py-2 rounded-lg hover:opacity-90 transition-colors flex items-center gap-2"
              >
                <i className="fa-solid fa-plus"></i>
                <span>添加资源</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* 资源列表 */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {isLoading ? (
            // 加载状态
            <div className="py-20 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)] mb-4"></div>
              <p className="text-gray-500">加载资源中...</p>
            </div>
          ) : filteredResources.length === 0 ? (
            // 空状态
            <div className="py-20 text-center">
              <i className="fa-solid fa-folder-open text-5xl text-gray-300 mb-4"></i>
              <h3 className="text-xl font-medium text-gray-900 mb-2">没有找到资源</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                {searchQuery 
                  ? '没有找到匹配的资源，请尝试其他搜索词' 
                  : '当前没有资源，请添加您的第一个资源'}
              </p>
              <button
                onClick={() => {
                  setEditingResource(null);
                  setIsFormOpen(true);
                }}
                className="inline-flex items-center gap-2 bg-[var(--primary)] text-white px-5 py-2 rounded-lg hover:bg-[var(--primary-dark)] transition-colors"
              >
                <i className="fa-solid fa-plus"></i>
                <span>添加资源</span>
              </button>
            </div>
          ) : (
            // 资源表格
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      标题
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      类型
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      平台
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      大小
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      上传日期
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      下载量
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredResources.map((resource) => (
                    <tr key={resource.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-gray-100 rounded-md mr-3">
                            {resource.resourceType === 'document' && <i className="fa-solid fa-file-text-o text-blue-500"></i>}
                            {resource.resourceType === 'video' && <i className="fa-solid fa-film text-red-500"></i>}
                            {resource.resourceType === 'audio' && <i className="fa-solid fa-music text-purple-500"></i>}
                            {resource.resourceType === 'software' && <i className="fa-solid fa-download text-green-500"></i>}
                            {resource.resourceType === 'image' && <i className="fa-solid fa-image text-yellow-500"></i>}
                            {resource.resourceType === 'compressed' && <i className="fa-solid fa-file-archive-o text-orange-500"></i>}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900 line-clamp-1 max-w-xs">
                              {resource.title}
                            </div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {resource.tags.slice(0, 3).map((tag, idx) => (
                                <span key={idx} className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                                  {tag}
                                </span>
                              ))}
                              {resource.tags.length > 3 && (
                                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                                  +{resource.tags.length - 3}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900 capitalize">
                          {getResourceTypeName(resource.resourceType)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">
                          {getPlatformName(resource.platform)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{resource.size}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{resource.uploadDate}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{resource.downloadCount}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="inline-flex rounded-md shadow-sm" role="group">
                          <button
                            onClick={() => {
                              setEditingResource(resource);
                              setIsFormOpen(true);
                            }}
                            className="px-3 py-1 text-sm text-blue-600 bg-blue-50 rounded-l-lg border border-blue-100 hover:bg-blue-100 transition-colors"
                          >
                            <i className="fa-solid fa-pen-to-square mr-1"></i> 编辑
                          </button>
                          <button
                            onClick={() => handleDeleteResource(resource.id)}
                            className="px-3 py-1 text-sm text-red-600 bg-red-50 rounded-r-lg border border-red-100 hover:bg-red-100 transition-colors"
                          >
                            <i className="fa-solid fa-trash mr-1"></i> 删除
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {resources.length > 10 && (
            <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
              <p className="text-sm text-gray-500">显示 {Math.min(resources.length, 10)} 条，共 {resources.length} 条</p>
              <div className="flex gap-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                <button className="px-3 py-1 bg-[var(--primary)] text-white rounded-md text-sm">1</button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">2</button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">3</button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      
      {/* 页脚 */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
          <p>© 2025 资源分享站管理后台</p>
        </div>
      </footer>
      
      {/* 资源表单模态框 */}
      <ResourceForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingResource(null);
        }}
        initialData={editingResource || undefined}
        onSubmit={editingResource ? handleEditResource : handleAddResource}
      />
    </div>
  );
}