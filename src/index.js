import React from 'react';
import ReactDOM from 'react-dom';
import getTree from './getTree';
import App from './App';
// import tree from './test/fixtures/tree.json';

const MAX_RETRIES = 10;
let loaded = false;

/* eslint-disable no-undef */
const injectFontAwesome = () => {
  const fontAwesome = document.createElement('style');
  fontAwesome.type = 'text/css';
  fontAwesome.textContent =
    `@font-face
      {
        font-family: FontAwesome;
        src: url('${chrome.extension.getURL('./font-awesome/fonts/fontawesome-webfont.woff')}');
      }`;

  document.head.appendChild(fontAwesome);
};

const getTotalFiles = () => {
  const fileTab = document.getElementById('files_tab_counter');
  if (fileTab) {
    const numberOfFilesString = fileTab.innerHTML.trim();
    return Number(numberOfFilesString);
  }
  return false;
};

const scrapeFileLinks = () => {
  const allFileLinks = document.querySelectorAll('div.file-info > a');

  if (allFileLinks) {
    const allFiles = [];
    allFileLinks.forEach((link) => {
      allFiles.push({
        name: link.innerHTML.trim(),
        href: link.attributes.getNamedItem('href').value,
      });
    });
    return allFiles;
  }
};

function initScrollWatcher() {
  window.onscroll = () => {
    const windowScroll = document.body.scrollTop;
    if (windowScroll < 464 && document.getElementById('fileTreeRoot')) {
      document.getElementById('fileTreeRoot').style.top = `${470 - windowScroll}px`;
    } else {
      document.getElementById('fileTreeRoot').style.top = '70px';
    }
  };
}

/* eslint-disable no-undef */
const showTree = (tree) => {
  console.log('showing tree')
  const div = document.createElement('div');
  div.setAttribute('id', 'treeRoot');
  // document.body.appendChild(div);
  const files = document.getElementById('files');
  files.parentNode.insertBefore(div, files);

  ReactDOM.render(
    <App tree={tree} />,
    document.getElementById('treeRoot'),
  );

  initScrollWatcher();
};

let tries = 0;

const tryToShowTree = (totalFiles) => {
  const fileLinks = scrapeFileLinks();
  if (fileLinks.length < totalFiles) {
    tries += 1;
    if (tries > MAX_RETRIES) {
      console.log('Could not scrape files to display file tree.');
      return;
    }
    window.setTimeout(() => tryToShowTree(totalFiles), 1000);
  } else {
    const tree = getTree(fileLinks);
    showTree(tree);
    loaded = true;
  }
};

// const registerFilesTabListener = (totalFiles) => {
//   const tabs = [...document.querySelectorAll('.tabnav-tab')];
//   const filesTab = tabs[tabs.length - 1];
//   filesTab.addEventListener('click', () => {
//     console.log('clicked tab')
//     if (!loaded) {
//       tries = 0;
//       tryToShowTree(totalFiles);
//     }
//   })
// };

const init = () => {
  injectFontAwesome();
  const totalFiles = getTotalFiles();
  tryToShowTree(totalFiles);
}

// registerFilesTabListener(totalFiles);
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.greeting == "hello") {
    sendResponse({farewell: "goodbye"});
  }
  init();
});
