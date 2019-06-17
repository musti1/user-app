import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Select} from 'antd';

const {Option} = Select;

const optionsList = ['CH', 'ES', 'FR', 'GB'];

class NatSelector extends Component {

    render() {
        const children = optionsList.map((option, k) => {
            return (<Option key={k}>{option}</Option>);
        });
        return (
            <div>

                <Select
                    mode="multiple"
                    style={{width: '100%'}}
                    placeholder="Select Nationalities"
                    defaultValue={this.props.nationalities}
                    onChange={this.props.onChange}
                >
                    {children}
                </Select>
            </div>

        );
    }
}

NatSelector.propTypes = {
    onChange: PropTypes.func.isRequired,
    nationalities: PropTypes.array.isRequired,
};

export default NatSelector;