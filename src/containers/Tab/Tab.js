import React, { Component } from "react";
import PropTypes from "prop-types";
import Icon from '@mdi/react'

class Tab extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  onClick = () => {
    const { icon, label, onClick } = this.props;
    onClick(label, icon);
  };

  render() {
    const {
      onClick,
      props: { activeTab, label, icon },
    } = this;

    let className = "btn-toggle pa-2";

    if (activeTab === label) {
      className += "btn-toggle-active pa-2";
    }

    return (
      <button className={className} onClick={onClick}>
        <Icon className='bulb' path={icon} size={1} />
        <h5>{label}</h5>
      </button>
    );
  }
}

export default Tab;