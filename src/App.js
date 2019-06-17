import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Layout} from 'antd';
import SiteHeader from './Components/Common/SiteHeader';
import SettingsContainer from './Containers/SettingsContainer';
import SiteFooter from './Components/Common/SiteFooter';
import UserContainer from './Containers/UserContainer';

const {Content} = Layout;

function App() {
    return (
        <Router>
            <Layout>
                <SiteHeader/>
                <Content style={{margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280}}>
                    <Route exact path="/" component={UserContainer}/>
                    <Route path="/settings" component={SettingsContainer}/>
                </Content>
                <SiteFooter/>
            </Layout>
        </Router>
    );
}

export default App;
