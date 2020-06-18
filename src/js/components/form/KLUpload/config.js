/**
 * common config
 */

const sizeMap = {
  K: '1024',
  KB: '1024',
  M: '1048576', // 1024 * 1024
  MB: '1048576', // 1024 * 1024
  G: '1073741824', // 1024 * 1024 * 1024
  GB: '1073741824', // 1024 * 1024 * 1024
};

const typeMap = {
  'image/*': 'image',
  '.jpg': 'image',
  '.jpeg': 'image',
  '.gif': 'image',
  '.png': 'image',
  '.webp': 'image',
  '.zip': 'zip',
  '.rar': 'rar',
  '.gz': 'gz',
  document: 'doc',
  sheet: 'excel',
  powerpoint: 'ppt',
  msword: 'doc',
  '.doc': 'doc',
  '.xlsx': 'excel',
  '.xls': 'excel',
  '.ppt': 'ppt',
  '.pptx': 'ppt',
  'video/*': 'video',
  '.mp4': 'video',
  '.mkv': 'video',
  '.rmvb': 'video',
  '.avi': 'video',
  'audio/*': 'audio',
  '.mp3': 'audio',
  'application/pdf': 'pdf',
  '.pdf': 'pdf',
  'application/javascript': 'js',
  '.js': 'js',
  '.html': 'html',
  '.txt': 'text',
  'text/plain': 'text',
  '.json': 'json',
};

const flagMap = {
  ADDED: 0,
  ORIGINAL: 1,
  DELETED: 2,
};

module.exports = {
  sizeMap,
  typeMap,
  flagMap,
};
