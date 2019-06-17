import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Input} from 'antd';

const Search = Input.Search;


class UserSearch extends Component {

    render() {
        return (
            <Search placeholder="Search by user firstname + lastname " onSearch={this.props.onSearch} enterButton/>
        )
    }
}

UserSearch.propTypes = {
    onSearch: PropTypes.func.isRequired
};


export default UserSearch;