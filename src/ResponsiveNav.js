import React, { Component } from 'react'
import { Popover, Icon } from 'antd'
import PropTypes from 'prop-types'
import { throttle } from 'lodash'

class ResponsiveNav extends Component {
  state = {
    viewportWidth: 0,
    menuVisible: false,
  };

  componentDidMount() {
    // update viewportWidth on initial load
    this.saveViewportDimensions();
    // update viewportWidth whenever the viewport is resized
    window.addEventListener('resize', this.saveViewportDimensions);
  }

  componentWillUnmount() {
    // clean up - remove the listener before unmounting the component
    window.removeEventListener('resize', this.saveViewportDimensions);
  }

  handleMenuVisibility = (menuVisible) => {
    this.setState({ menuVisible });
  };
  
  // first of all notice lodash.throttle() helper
  // we do not want to run the saveViewportDimensions() hundreads of times
  // from start to finish whenever the viewport is being resized
  saveViewportDimensions = throttle(() => {
    this.setState({
      viewportWidth: window.innerWidth,
    })
  }, this.props.applyViewportChange); // default 250ms

  render() {
    const MenuMarkup = this.props.menuMarkup; // get the Menu markup, passed as prop

    if (this.state.viewportWidth > this.props.mobileBreakPoint) {
      // viewportWidth is over the mobileBreakpoint - render menu as is 
      return <MenuMarkup activeLinkKey={this.props.activeLinkKey} />;
    }

    return (
      <Popover
        content={<MenuMarkup
          // whenever the Menu item is clicked, hide the Popover
          onLinkClick={() => this.handleMenuVisibility(false)}
          // pass the proper activeLinkKey (this comes from React Router's props.location.pathname)
          activeLinkKey={this.props.activeLinkKey}
          mobileVersion // same as mobileVersion={true}
          // className='to-override-mobile-menu-class'
          />
        }
        trigger='click'
        placement={this.props.placement}
        visible={this.state.menuVisible}
        onVisibleChange={this.handleMenuVisibility}
      >
        <Icon
          className='iconHamburger'
          type='menu'
        />
      </Popover>
    );
  }
}

ResponsiveNav.propTypes = {
  mobileBreakPoint: PropTypes.number,
  applyViewportChange: PropTypes.number,
  activeLinkKey: PropTypes.string,
  placement: PropTypes.string,
  menuMarkup: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]),
};

ResponsiveNav.defaultProps = {
  mobileBreakPoint: 575,
  applyViewportChange: 250,
  placement: 'bottom',
}

export default ResponsiveNav
