import deepmerge from 'deepmerge';

export const getSubTree = (pathParts, href) => {
  const tree = {};
  if (pathParts.length) {
    const thisFolderOrFile = pathParts[0];
    const restOfPath = pathParts.slice(1);
    const treeNode = { __tree_type: restOfPath.length ? 'folder' : 'file' };
    tree[thisFolderOrFile] = restOfPath.length ?
      deepmerge(treeNode, getSubTree(restOfPath, href))
      : Object.assign({}, treeNode, { href });
  }
  return tree;
};

export default allFiles => allFiles.reduce((tree, { name, href }) => {
  const pathParts = name.split('/');
  return deepmerge(tree, getSubTree(pathParts, href));
}, { __tree_type: 'folder' });
