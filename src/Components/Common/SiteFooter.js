import React, {Component} from 'react';
import {Layout, Icon} from 'antd';

const {Footer} = Layout;

class SiteFooter extends Component {
    render() {
        return (
            <Footer style={{ textAlign: 'center' }}> Built with love by mustafa <Icon type="smile" /></Footer>
        )
    }
}

export default SiteFooter;