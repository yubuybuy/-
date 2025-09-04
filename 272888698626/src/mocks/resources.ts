import { Resource } from '@/types/resource';

// 初始模拟资源数据
const INITIAL_RESOURCES: Resource[] = [
  {
    id: '1',
    title: '2023年最新前端开发学习资料合集',
    description: '包含React、Vue、TypeScript等前端技术的最新学习资料和项目实战',
    platform: 'baidu',
    resourceType: 'document',
    size: '2.5GB',
    format: 'zip',
    uploadDate: '2025-08-15',
    downloadUrl: '#',
    thumbnailUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=frontend%20development%20resources%20folder&sign=31b606b8b61baf1ecba13b86a3bb8911',
    likeCount: 328,
    downloadCount: 1562,
    tags: ['前端', '学习资料', 'React', 'Vue']
  },  
  {
    id: '2',
    title: 'Adobe Creative Cloud 2024全家桶安装包',
    description: 'Adobe全套设计软件集合，包含Photoshop、Illustrator、Premiere等',
    platform: 'aliyun',
    resourceType: 'software',
    size: '18.7GB',
    format: 'dmg,exe',
    uploadDate: '2025-08-10',
    downloadUrl: '#',
    thumbnailUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Adobe%20Creative%20Cloud%20software%20icon&sign=00719f9d9e8d42a63f50c8fc28c04dea',
    likeCount: 542,
    downloadCount: 3205,
    tags: ['设计', '软件', 'Adobe', '创意']
  },
  {
    id: '3',
    title: '精选4K风景摄影素材',
    description: '500张高质量4K风景照片，适合设计、视频制作等用途',
    platform: 'tencent',
    resourceType: 'image',
    size: '12.3GB',
    format: 'jpg,png',
    uploadDate: '2025-08-05',
    downloadUrl: '#',
    thumbnailUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=4K%20landscape%20photography%20collection&sign=d78b8a0c9118c07577f157e184fddd79',
    likeCount: 289,
    downloadCount: 956,
    tags: ['摄影', '素材', '4K', '风景']
  },
  {
    id: '4',
    title: 'Python数据分析实战项目教程',
    description: '从入门到进阶的Python数据分析教程，包含10个实战项目',
    platform: 'baidu',
    resourceType: 'video',
    size: '8.4GB',
    format: 'mp4',
    uploadDate: '2025-07-28',
    downloadUrl: '#',
    thumbnailUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Python%20data%20analysis%20tutorial&sign=e235ef514e2a253175164749b0b9a5bd',
    likeCount: 412,
    downloadCount: 2103,
    tags: ['Python', '数据分析', '教程', '编程']
  },
  {
    id: '5',
    title: 'Windows系统优化工具包',
    description: '精选系统优化工具集合，提升电脑性能，清理垃圾文件',
    platform: '123pan',
    resourceType: 'software',
    size: '1.2GB',
    format: 'zip',
    uploadDate: '2025-07-20',
    downloadUrl: '#',
    thumbnailUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Windows%20system%20optimization%20tools&sign=8aab1af0a2319526ba2b67423583bbad',
    likeCount: 187,
    downloadCount: 843,
    tags: ['系统工具', 'Windows', '优化', '实用软件']
  },
  {
    id: '6',
    title: '世界经典文学名著电子书合集',
    description: '包含200部世界经典文学作品，epub格式，适合各种阅读器',
    platform: 'aliyun',
    resourceType: 'document',
    size: '3.8GB',
    format: 'epub',
    uploadDate: '2025-07-15',
    downloadUrl: '#',
    thumbnailUrl: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=classic%20literature%20ebooks%20collection&sign=41fc09ab688126793f6d7ef0f5ce61b7',
    likeCount: 256,
    downloadCount: 1320,
    tags: ['文学', '电子书', '经典', '名著']
  }
];

// 导出供外部使用的模拟资源数据
export const MOCK_RESOURCES = INITIAL_RESOURCES;

// 从localStorage获取资源数据，如果没有则使用初始数据
export const getResources = (): Resource[] => {
  const savedResources = localStorage.getItem('resources');
  return savedResources ? JSON.parse(savedResources) : [...INITIAL_RESOURCES];
};

// 保存资源数据到localStorage
export const saveResources = (resources: Resource[]): void => {
  localStorage.setItem('resources', JSON.stringify(resources));
};

// 获取单个资源
export const getResourceById = (id: string): Resource | undefined => {
  const resources = getResources();
  return resources.find(resource => resource.id === id);
};

// 按平台筛选资源
export const getResourcesByPlatform = (platform: string): Resource[] => {
  const resources = getResources();
  if (platform === 'all') return resources;
  return resources.filter(resource => resource.platform === platform);
};

// 按类型筛选资源
export const getResourcesByType = (type: string): Resource[] => {
  const resources = getResources();
  if (type === 'all') return resources;
  return resources.filter(resource => resource.resourceType === type);
};

// 添加新资源
export const addResource = (resource: Omit<Resource, 'id'>): Resource => {
  const resources = getResources();
  const newResource: Resource = {
    ...resource,
    id: Date.now().toString(), // 使用时间戳作为唯一ID
    likeCount: 0,
    downloadCount: 0,
    uploadDate: new Date().toISOString().split('T')[0] // 格式化为YYYY-MM-DD
  };
  
  const updatedResources = [newResource, ...resources];
  saveResources(updatedResources);
  return newResource;
};

// 更新资源
export const updateResource = (id: string, updatedData: Partial<Resource>): Resource | null => {
  const resources = getResources();
  const index = resources.findIndex(resource => resource.id === id);
  
  if (index === -1) return null;
  
  resources[index] = { ...resources[index], ...updatedData };
  saveResources(resources);
  return resources[index];
};

// 删除资源
export const deleteResource = (id: string): boolean => {
  const resources = getResources();
  const updatedResources = resources.filter(resource => resource.id !== id);
  
  if (updatedResources.length === resources.length) return false; // 没有找到要删除的资源
  
  saveResources(updatedResources);
  return true;
};