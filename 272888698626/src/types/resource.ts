export type CloudPlatform = 'baidu' | 'aliyun' | 'tencent' | '123pan' | 'other';

export type ResourceType = 'document' | 'video' | 'audio' | 'software' | 'image' | 'compressed' | 'other';

export interface Resource {
  id: string;
  title: string;
  description: string;
  platform: CloudPlatform;
  resourceType: ResourceType;
  size: string;
  format: string;
  uploadDate: string;
  downloadUrl: string;
  thumbnailUrl: string;
  likeCount: number;
  downloadCount: number;
  tags: string[];
}

export interface ResourceDetail extends Resource {
  content: string;
  password?: string;
  extractCode?: string;
  lastUpdated: string;
  relatedResources: string[];
}