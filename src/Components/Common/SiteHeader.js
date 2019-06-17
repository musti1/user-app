import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {NavLink, withRouter} from 'react-router-dom';
import {Layout, Menu, Icon} from 'antd';

const {Header} = Layout;

class SiteHeader extends Component {

    render() {
        const {location} = this.props;
        return (
            <Header>
                <div className="header-logo"/>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['/']}
                    selectedKeys={[location.pathname]}
                    style={{lineHeight: '64px'}}
                >
                    <Menu.Item key="/">
                        <NavLink to="/">
                            <Icon type="home"/>
                            <span>Home</span>
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="/settings">
                        <NavLink to="/settings">
                            <Icon type="setting"/>
                            <span>Settings</span>
                        </NavLink>
                    </Menu.Item>

                </Menu>
            </Header>
        )
    }
}

SiteHeader.propTypes = {
    location: PropTypes.object.isRequired
};

export default withRouter(SiteHeader);