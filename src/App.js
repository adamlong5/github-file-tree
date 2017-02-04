import React, { Component, PropTypes } from 'react';
import Folder from './Folder';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      collapseAll: false,
    };

    this.collapseAll = this.collapseAll.bind(this);
    this.expandAll = this.expandAll.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  close() {
    this.setState({ show: false });
    document.getElementById('files').style.marginLeft = '20px';
  }

  open() {
    this.setState({ show: true });
    document.getElementById('files').style.marginLeft = '220px';
  }

  collapseAll() {
    this.setState({ collapseAll: true });
  }

  expandAll() {
    this.setState({ collapseAll: false });
  }

  renderToolbar() {
    return (
      <div className="toolbar">
        {this.state.show ? (
          <div>
            <button className="collapse" onClick={this.collapseAll}>
              <i className="fa fa-minus-square" />
            </button>
            <button className="expand" onClick={this.expandAll}>
              <i className="fa fa-plus-square" />
            </button>
            <button className="close" onClick={this.close}>
              <i className="fa fa-times" />
            </button>
          </div>
        ) : (
          <button className="open" onClick={this.open}>
            <i className="fa fa-tree" />
          </button>
        )}
      </div>
    );
  }

  render() {
    return (
      <div id="fileTreeRoot" className={`${this.state.show ? 'open' : 'closed'}`}>
        {this.renderToolbar()}
        {this.state.show ?
          <Folder isRoot collapse={this.state.collapseAll} tree={this.props.tree} />
          : null
        }
      </div>
    );
  }
}

App.propTypes = {
  tree: PropTypes.object.isRequired,
};

export default App;
