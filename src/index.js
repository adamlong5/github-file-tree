import React from 'react';
import ReactDOM from 'react-dom';
import getTree from './getTree';
import Folder from './Folder';
/* eslint-disable no-undef */
const loadTree = () => {
  const div = document.createElement('div');
  div.setAttribute('id', 'treeRoot');
  // document.body.appendChild(div);
  const files = document.getElementById('files');
  files.parentNode.insertBefore(div, files);

  const tree = getTree()
  console.log(tree)
  ReactDOM.render(
    <Folder tree={tree} />,
    document.getElementById('treeRoot'),
  );

  window.onscroll = () => {
    const windowScroll = document.body.scrollTop;
    if (windowScroll < 464) {
      document.getElementById('treeRoot').style.top = `${464 - windowScroll}px`;
    } else {
      document.getElementById('treeRoot').style.top = '64px';
    }
  };
};

window.setTimeout(loadTree, 3000);
