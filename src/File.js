import React, { PropTypes } from 'react';

const File = ({ href, name }) => (
  <div className="treeFile">
    <a href={href}><i className="fa fa-file-code-o" />{` ${name}`}</a>
  </div>
);

File.propTypes = {
  href: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default File;
