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
  '.jpg': 'image',
  '.jpeg': 'image',
  '.gif': 'image',
  '.png': 'image',
  '.zip': 'zip',
  '.rar': 'zip',
  '.gz': 'zip',
  '.doc': 'doc',
  '.xlsx': 'doc',
  '.ppt': 'doc',
  '.mp4': 'video',
  '.mkv': 'video',
  '.rmvb': 'video',
  '.avi': 'video',
  '.mp3': 'audio',
  '.pdf': 'pdf',
  '.js': 'js',
  '.html': 'html',
  '.txt': 'text',
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
