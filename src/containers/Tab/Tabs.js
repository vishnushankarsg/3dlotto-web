import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';


class Tabs extends Component {
  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      activeTab: this.props.children[0].props.label,
    };
  }

  onClickTabItem = (tab) => {
    this.setState({ activeTab: tab });
  }

  render() {
    const {
      onClickTabItem,
      props: {
        children,
      },
      state: {
        activeTab,
      }
    } = this;

    return (
      <div className='tabs'>
        <div>
          {children.map((child) => {
            if (child.props.label !== activeTab) return undefined;
            return child.props.children;
          })}
        </div>
        <div className='divider mt-1 mb-1' />
        <div className="d-flex justify-space-around defi-toggle">
          {children.map((child) => {
            const { label, icon } = child.props;

            return (
              <Tab
                activeTab={activeTab}
                key={label}
                label={label}
                icon={icon}
                onClick={onClickTabItem}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Tabs;
