import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Row, Col, PageHeader} from 'antd';
import NatSelector from '../Components/Settings/NatSelector';
import {changeNationality} from '../State/Actions/SettingsActions';

class SettingsContainer extends Component {

    constructor(props){
        super(props);
        this.state = {
            goToHome: false
        }
    }
    handleOnBack = () => {
        this.setState({goToHome: true});
    };
    render() {
        if (this.state.goToHome === true) {
            return <Redirect to='/'/>
        }
        return (
            <Row>
                <Col>
                    <PageHeader
                        onBack={this.handleOnBack}
                        title="Settings"
                        subTitle="Choose your preferred nationalities"
                    />
                    <NatSelector
                        onChange={this.props.handleNationalityChange}
                        nationalities={this.props.nat}
                    />
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    const {settings} = state;
    return settings;
};

const mapDispatchToProps = dispatch => {
    return {
        handleNationalityChange: (nat) => dispatch(changeNationality(nat))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsContainer)