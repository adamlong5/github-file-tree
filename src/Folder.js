import React, { Component, PropTypes } from 'react';
import File from './File';

class Folder extends Component {
  constructor(props) {
    super(props);

    this.toggleState = this.toggleState.bind(this);

    this.state = {
      show: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { collapse } = nextProps;
    if (collapse) {
      this.setState({ show: false });
    } else {
      this.setState({ show: true });
    }
  }

  toggleState() {
    this.setState({ show: !this.state.show });
  }

  renderContents() {
    const keys = Object.keys(this.props.tree).filter(key => key !== '__tree_type');
    return (
      <div className="treeFolderContents">
        {keys.map((key, i) => {
          const subTree = this.props.tree[key];
          const type = subTree.__tree_type;
          return type === 'folder' ?
            <Folder collapse={this.props.collapse} key={`${key}-${i}`} name={key} tree={subTree} />
            : <File key={`${key}-${i}`} name={key} href={subTree.href} />;
        })}
      </div>
    );
  }

  shouldShow() {
    return this.props.isRoot || this.state.show;
  }

  render() {
    return (
      <div className="treeFolder">
        <div onClick={this.toggleState}>
          <h2 className="treeFolderName">
            <i className={`fa fa-folder${this.shouldShow() ? '-open' : ''}`} />
            {` ${this.props.name}/`}
          </h2>
        </div>
        {this.shouldShow() ? this.renderContents() : null}
      </div>
    );
  }
}

Folder.propTypes = {
  collapse: PropTypes.bool,
  isRoot: PropTypes.bool,
  name: PropTypes.string,
  tree: PropTypes.object.isRequired,
};

Folder.defaultProps = {
  collapse: false,
  name: 'Root',
  isRoot: false,
};

export default Folder;
