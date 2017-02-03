import React, { PropTypes } from 'react';

const File = ({ href, name }) => (
  <div className="treeFile">
    <a href={href}>{name}</a>
  </div>
);

File.propTypes = {
  href: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default File;
