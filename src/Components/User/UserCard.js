import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Avatar, Icon } from 'antd';
import SimpleUserType from "./types/SimpleUserType";


const { Meta } = Card;

class UserCard extends Component {

    render() {
        const {
            userName,
            firstName,
            lastName,
            thumbnail,
            email
        } = this.props.user;

        return (
            <Card
                data-testid="user-card"
                bordered={true}
                style={{ marginBottom: '5px'}}
                actions={[
                    <Icon
                        onClick={() => this.props.onClick(this.props.user)}
                        type="ellipsis"
                    />
                ]}
            >
                <Meta
                    avatar={<Avatar src={thumbnail} />}
                    title={userName}
                    description={
                        <div>
                            <p>Name: {firstName} {lastName}</p>
                            <p>{email}</p>
                        </div>
                    }
                />

            </Card>
        );
    }
}

UserCard.propTypes = {
    onClick: PropTypes.func.isRequired,
    user: PropTypes.shape(SimpleUserType)
};

export default UserCard;