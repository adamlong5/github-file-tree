import deepmerge from 'deepmerge';

export const getSubTree = (pathParts, href) => {
  const tree = {};
  if (pathParts.length) {
    const thisFolderOrFile = pathParts[0];
    const restOfPath = pathParts.slice(1);
    const treeNode = { __tree_type: restOfPath.length ? 'folder' : 'file' };
    tree[thisFolderOrFile] = restOfPath.length ?
      deepmerge(treeNode, getSubTree(restOfPath, href))
      : { ...treeNode, href };
  }
  return tree;
};

export default (document = window.document) => {
  const allFileLinks = document.querySelectorAll('div.file-info > a');

  if (allFileLinks) {
    const allFiles = [];
    allFileLinks.forEach((link) => {
      allFiles.push({
        name: link.innerHTML.trim(),
        href: link.attributes.getNamedItem('href').value,
      });
    });
    console.log('found this many files', allFiles.length)

    return allFiles.reduce((tree, { name, href }) => {
      const pathParts = name.split('/');
      return deepmerge(tree, getSubTree(pathParts, href));
    }, { __tree_type: 'folder' });
  }
};
