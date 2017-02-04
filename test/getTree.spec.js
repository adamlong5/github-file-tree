import { getSubTree } from '../getTree';

it('Builds a tree for a file path', () => {
  const pathParts = ['foo', 'bar', 'z.js'];
  const href = 'foo.com';
  const tree = getSubTree(pathParts, href);
  expect(tree).toEqual({
    foo: {
      __tree_type: 'folder',
      bar: {
        __tree_type: 'folder',
        'z.js': {
          __tree_type: 'file',
          href,
        },
      },
    },
  });
});
