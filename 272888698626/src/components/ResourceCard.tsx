import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Resource } from '@/types/resource';
import { cn } from '@/lib/utils';

interface ResourceCardProps {
  resource: Resource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // 根据平台返回对应的图标和样式
  const getPlatformInfo = () => {
    switch (resource.platform) {
      case 'baidu':
        return { 
          icon: <i class="fa-brands fa-baidu text-blue-500"></i>, 
          name: '百度网盘',
          bgColor: 'bg-blue-100'
        };
      case 'aliyun':
        return { 
          icon: <i class="fa-solid fa-cloud text-orange-500"></i>, 
          name: '阿里云盘',
          bgColor: 'bg-orange-100'
        };
      case 'tencent':
        return { 
          icon: <i class="fa-brands fa-qq text-blue-600"></i>, 
          name: '腾讯云盘',
          bgColor: 'bg-blue-100'
        };
      case '123pan':
        return { 
          icon: <i class="fa-solid fa-hdd text-green-500"></i>, 
          name: '123云盘',
          bgColor: 'bg-green-100'
        };
      default:
        return { 
          icon: <i class="fa-solid fa-cloud text-gray-500"></i>, 
          name: '其他网盘',
          bgColor: 'bg-gray-100'
        };
    }
  };
  
  // 根据资源类型返回对应的图标
  const getResourceTypeIcon = () => {
    switch (resource.resourceType) {
      case 'document':
        return <i class="fa-solid fa-file-text-o text-blue-500"></i>;
      case 'video':
        return <i class="fa-solid fa-film text-red-500"></i>;
      case 'audio':
        return <i class="fa-solid fa-music text-purple-500"></i>;
      case 'software':
        return <i class="fa-solid fa-download text-green-500"></i>;
      case 'image':
        return <i class="fa-solid fa-image text-yellow-500"></i>;
      case 'compressed':
        return <i class="fa-solid fa-file-archive-o text-orange-500"></i>;
      default:
        return <i class="fa-solid fa-file-o text-gray-500"></i>;
    }
  };
  
  const platformInfo = getPlatformInfo();
  
  const handleSaveToCloud = () => {
    toast.success(`已成功将资源转存至${platformInfo.name}`);
    // 实际项目中这里会调用对应网盘的API实现转存功能
  };
  
  return (
    <div 
      className={cn(
     "group relative bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl",
    isHovered ? "transform translate-y-[-5px]" : ""
  )}
  onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 缩略图区域 */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={resource.thumbnailUrl} 
          alt={resource.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2 flex gap-1">
          <span className={cn("text-xs px-2 py-1 rounded-full flex items-center gap-1 bg-[var(--primary)]/10 text-[var(--primary)]")}>
            {platformInfo.icon}
            <span>{platformInfo.name}</span>
          </span>
        </div>
      </div>
      
      {/* 内容区域 */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2 text-sm text-gray-500">
          {getResourceTypeIcon()}
          <span className="capitalize">{resource.resourceType === 'document' ? '文档' : 
                             resource.resourceType === 'video' ? '视频' :
                             resource.resourceType === 'audio' ? '音频' :
                             resource.resourceType === 'software' ? '软件' :
                             resource.resourceType === 'image' ? '图片' :
                             resource.resourceType === 'compressed' ? '压缩包' : '其他'}</span>
          <span className="mx-2">•</span>
          <span>{resource.size}</span>
          <span className="mx-2">•</span>
          <span>{resource.uploadDate}</span>
        </div>
        
        <Link to={`/resource/${resource.id}`}>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {resource.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {resource.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {resource.tags.map((tag, index) => (
            <span key={index} className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <i class="fa-solid fa-download"></i>
              <span>{resource.downloadCount}</span>
            </span>
            <span className="flex items-center gap-1">
              <i class="fa-solid fa-heart"></i>
              <span>{resource.likeCount}</span>
            </span>
          </div>
          
            <button 
            onClick={handleSaveToCloud}
            className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] hover:opacity-90 text-white text-sm px-3 py-1 rounded-lg transition-all flex items-center gap-1 shadow-md hover:shadow-lg"
          >
            <i class="fa-solid fa-cloud-arrow-down"></i>
            <span>转存</span>
          </button>
        </div>
      </div>
    </div>
  );
}