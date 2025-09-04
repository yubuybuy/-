import { useState, useEffect } from 'react';
import ResourceCard from '@/components/ResourceCard';
import { MOCK_RESOURCES, getResourcesByPlatform, getResourcesByType } from '@/mocks/resources';
import { Resource } from '@/types/resource';
import { cn } from '@/lib/utils';


// 资源分类选项
const RESOURCE_CATEGORIES = [
  { 
    id: 'video', 
    name: '电影资源', 
    count: 156, 
    icon: <i class="fa-solid fa-film text-white text-xl"></i>, 
    bgColor: 'bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)]',
    description: '最新热门电影、经典影片、4K高清资源',
    popular: ['沙丘2', '魔兽海默', '芭比']
  },
  { 
    id: 'software', 
    name: '软件工具', 
    count: 89, 
    icon: <i class="fa-solid fa-tools text-white text-xl"></i>, 
    bgColor: 'bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)]',
    description: '专业软件、系统工具、开发环境',
    popular: ['Adobe 2024', 'Office 2024', 'Visual Studio']
  },
  { 
    id: 'audio', 
    name: '音乐资源', 
    count: 234, 
    icon: <i class="fa-solid fa-music text-white text-xl"></i>, 
    bgColor: 'bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)]',
    description: '无损音乐、专辑合集、单曲精选',
    popular: ['华语金曲', 'Taylor Swift', '古典音乐']
  },
  { 
    id: 'document', 
    name: '学习资料', 
    count: 198, 
    icon: <i class="fa-solid fa-book-open text-white text-xl"></i>, 
    bgColor: 'bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)]',
    description: '教程文档、电子书、学习视频',
    popular: ['前端开发', '数据分析', '英语学习']
  },
  { 
    id: 'image', 
    name: '图片素材', 
    count: 143, 
    icon: <i class="fa-solid fa-camera text-white text-xl"></i>, 
    bgColor: 'bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)]',
    description: '设计素材、壁纸、摄影作品',
    popular: ['4K壁纸', 'UI设计', '摄影图集']
  },
  { 
    id: 'compressed', 
    name: '压缩包', 
    count: 105, 
    icon: <i class="fa-solid fa-box-archive text-white text-xl"></i>, 
    bgColor: 'bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)]',
    description: '各类资源压缩包',
    popular: ['游戏资源', '系统镜像', '备份文件']
  },
];

export default function Home() {
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResources, setFilteredResources] = useState<Resource[]>(MOCK_RESOURCES);

  // 处理过滤逻辑
  const handleFilterChange = () => {
    let result = MOCK_RESOURCES;
    
    // 按平台过滤
    result = getResourcesByPlatform(selectedPlatform);
    
    // 按类型过滤
    result = getResourcesByType(selectedType);
    
    // 按搜索词过滤
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(resource => 
        resource.title.toLowerCase().includes(query) || 
        resource.description.toLowerCase().includes(query) ||
        resource.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    setFilteredResources(result);
  };

  // 当选择平台或类型变化时应用过滤
  useEffect(() => {
    handleFilterChange();
  }, [selectedPlatform, selectedType]);

  return (
    <div className="min-h-screen bg-[var(--light-bg)]">
      {/* 头部导航 */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <i class="fa-solid fa-folder-open text-[var(--primary-purple)] text-2xl mr-2"></i>
               <span className="font-bold text-lg text-[var(--primary)]">资源分享站</span>
                <span className="text-xs text-gray-500 ml-2">精品资源，专页介绍</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="搜索资源..."
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)] focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    handleFilterChange();
                  }}
                />
                <i class="fa-solid fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>
              
               <button className="hidden md:block bg-white border border-[var(--primary)] text-[var(--primary)] px-4 py-2 rounded-full text-sm font-medium hover:bg-[var(--primary)]/5 transition-colors">
                投稿
              </button>
              
                <button 
                  className="bg-[var(--primary)] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[var(--primary-dark)] transition-colors flex items-center gap-1"
                  onClick={() => window.location.href = '/admin/login'}
                >
                  <i class="fa-solid fa-user-circle"></i>
                  <span className="hidden sm:inline">登录</span>
                </button>
            </div>
          </div>
        </div>
      </header>

      {/* 主要内容区 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero区域 */}
        <div className="text-center py-12 mb-10">
           <h1 className="text-4xl md:text-5xl font-bold text-[var(--primary)] mb-3">精品资源，专页分享</h1>
          <p className="text-gray-500 mb-2">每个资源都有独立的详细介绍页面</p>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">从电影软件到音乐教程，精心整理，用心推荐</p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
               className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-6 py-3 rounded-full text-lg font-medium transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <i class="fa-solid fa-pen-to-square"></i>
              开始探索
            </button>
            
            <button 
              className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-full text-lg font-medium transition-all hover:border-gray-400 flex items-center justify-center gap-2"
              onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <i class="fa-solid fa-list"></i>
              分类浏览
            </button>
          </div>
        </div>
        
        {/* 移动端搜索框 */}
        <div className="md:hidden mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="搜索资源、标签或描述..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)] focus:border-transparent"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handleFilterChange();
              }}
            />
            <i class="fa-solid fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>
        
        {/* 资源分类 */}
        <section id="categories" className="mb-16">
           <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6 flex items-center">
             <i class="fa-solid fa-folder-open text-[var(--primary)] mr-2"></i>
            资源分类
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {RESOURCE_CATEGORIES.map(category => (
              <div 
                key={category.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                <div className="p-5 flex justify-between items-start">
                  <div>
                    <div className={cn("w-12 h-12 rounded-full flex items-center justify-center mb-3", category.bgColor)}>
                      {category.icon}
                    </div>
                    <h3 className="font-bold text-lg mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">{category.count} 个资源</p>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{category.description}</p>
                    
                    <div className="flex flex-wrap gap-1">
                      {category.popular.map((item, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <button className={cn("p-2 rounded-full", category.bgColor, "text-white")}>
                    <i class="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* 资源列表 */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
             <h2 className="text-2xl font-bold text-[var(--text-primary)] flex items-center">
               <i class="fa-solid fa-th-large text-[var(--primary)] mr-2"></i>
              最新资源
            </h2>
            
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm">排序:</span>
              <select className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)] focus:border-transparent">
                <option>最新上传</option>
                <option>最多下载</option>
                <option>最多收藏</option>
              </select>
            </div>
          </div>
          
          {/* 平台过滤选项 */}
           <div className="mb-6 overflow-x-auto pb-2 bg-white p-3 rounded-xl">
            <div className="flex gap-2 min-w-max">
              {[
                { value: 'all', label: '全部平台' },
                { value: 'baidu', label: '百度网盘' },
                { value: 'aliyun', label: '阿里云盘' },
                { value: 'tencent', label: '腾讯云盘' },
                { value: '123pan', label: '123云盘' },
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => setSelectedPlatform(option.value)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors whitespace-nowrap ${
                    selectedPlatform === option.value
                      ? 'bg-[var(--primary)] text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* 结果统计 */}
          <div className="mb-6 flex justify-between items-center">
             <p className="text-[var(--text-secondary)]">找到 <span className="font-semibold text-[var(--primary)]">{filteredResources.length}</span> 个资源</p>
          </div>
          
          {/* 资源网格 */}
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map(resource => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl">
              <i class="fa-solid fa-search text-5xl text-gray-300 mb-4"></i>
              <h3 className="text-xl font-medium text-gray-900 mb-2">未找到匹配资源</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                尝试使用不同的搜索词或筛选条件
              </p>
            </div>
          )}
          
          {/* 加载更多按钮 */}
          {filteredResources.length > 0 && (
            <div className="text-center mt-10">
               <button className="bg-white border border-[var(--primary)] text-[var(--primary)] px-6 py-3 rounded-full text-sm font-medium hover:bg-[var(--primary)]/5 transition-colors">
                加载更多资源
              </button>
            </div>
          )}
        </section>
      </main>
      
      {/* 页脚 */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-500 text-sm">
            <p>© 2025 资源分享站 - 所有资源均来自网络分享，如有侵权请联系删除</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// 添加缺失的useEffect导入