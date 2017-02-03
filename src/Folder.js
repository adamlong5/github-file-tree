import React, { PropTypes } from 'react';
import File from './File';

const Folder = (props) => {
  const keys = Object.keys(props.tree).filter(key => key !== '__tree_type');
  return (
    <div className="treeFolder">
      <div>
        <h2 className="treeFolderName">{`${props.name}/`}</h2>
      </div>
      <div className="treeFolderContents">
        {keys.map((key, i) => {
          const subTree = props.tree[key];
          const type = subTree.__tree_type;
          return type === 'folder' ?
            <Folder key={`${key}-${i}`} name={key} tree={subTree} />
              : <File key={`${key}-${i}`} name={key} href={subTree.href} />;
        })}
      </div>
    </div>
  );
};

Folder.propTypes = {
  name: PropTypes.string,
  tree: PropTypes.object.isRequired,
};

Folder.defaultProps = {
  name: 'Root',
};

export default Folder;
