import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { Spin, Typography  } from 'antd';
import SimpleUserType from './types/SimpleUserType';
import UserCard from './UserCard';

const { Text } = Typography;

class UserGrid extends Component{

    render(){
        const {users, isLoading, hasMore, onUserClick} = this.props;
        const userList = users.map((user) =>
            <Col key={user.id} span={6}><UserCard onClick={onUserClick} user={user}/></Col>
        );
        return (
            <div>
                <Row gutter={1} className="user-list">
                    {userList}
                </Row>
                <Row type="flex" justify="center" className="user-list-loader">
                    <Col span={2}>
                        { isLoading
                            ? <Spin size="large"/>
                            : null
                        }
                    </Col>
                </Row>
                <Row type="flex" justify="center">
                    <Col style={{ textAlign: 'center' }} span={4}>
                        { !hasMore
                            ? <Text type="warning" strong>End of User Catalog</Text>
                            : null
                        }
                    </Col>
                </Row>

            </div>
        );
    }
}
UserGrid.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape(SimpleUserType).isRequired
    ).isRequired,
    isLoading: PropTypes.bool.isRequired,
    hasMore: PropTypes.bool.isRequired,
    onUserClick: PropTypes.func.isRequired
};

export default UserGrid;