import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row, Col, Affix} from 'antd';
import UserGrid from '../Components/User/UserGrid';
import UserDetailsModel from '../Components/User/UserDetailsModel';
import UserSearch from '../Components/User/UserSearch';

import {
    loadMore,
    selectUser,
    unSelectUser,
    filterUsers,
} from '../State/Actions/UsersActions';

class UserContainer extends Component {

    componentDidMount() {
        this.props.loadUsersData();
        this.handleScrollToBottom();
    }

    handleScrollToBottom() {
        // Binds our scroll event handler
        window.onscroll = async () => {
            if (this.props.isLoading ||
                !this.props.paginationInfo.hasMore()) return;
            if (
                window.innerHeight + document.documentElement.scrollTop
                === document.documentElement.scrollHeight
            ) {
                console.log('loading more data');
                this.props.loadUsersData();
            }
        };
    }

    render() {
        return (

            <Row>
                <Col>
                    <Row style={{marginBottom: 8}}>
                        <Col span={6}>
                            <Affix offsetTop={10}>
                                <UserSearch
                                    onSearch={this.props.handleSearch}
                                />
                            </Affix>

                        </Col>

                    </Row>
                    <Row style={{marginBottom: 8}}>
                        {
                            (this.props.selectedUser !== null)
                                ? <UserDetailsModel
                                    onClose={this.props.handleUserClose}
                                    user={this.props.selectedUser}
                                />
                                : null
                        }
                    </Row>
                    <Row style={{marginBottom: 8}}>
                        <UserGrid
                            users={this.props.filteredList}
                            isLoading={this.props.isLoading}
                            hasMore={this.props.paginationInfo.hasMore()}
                            onUserClick={this.props.handleUserClick}
                        />
                    </Row>
                </Col>
            </Row>

        );
    }
}

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = dispatch => {
    return {
        // dispatching plain actions
        handleSearch: (searchTem) => dispatch(filterUsers(searchTem)),
        handleUserClick: (user) => dispatch(selectUser(user)),
        handleUserClose: () => dispatch(unSelectUser()),
        loadUsersData: () => dispatch(loadMore()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(UserContainer);