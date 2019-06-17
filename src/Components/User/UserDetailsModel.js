import React, {Component} from 'react';
import PropTypes from 'prop-types';
import DetailedUserType from './types/DetailedUserType';
import {Row, Col, Modal, Card, Avatar} from 'antd';

const {Meta} = Card;

class UserDetailsModel extends Component {

    render() {
        const {
            userName,
            firstName,
            lastName,
            location,
            thumbnail,
            image,
            email,
            phone,
            cell,
        } = this.props.user;

        return (
            <Modal

                title="Selected Users Details"
                visible={true}
                footer={null}
                onCancel={this.props.onClose}
            >
                <Row type="flex" justify="center">
                    <Col>
                        <Card
                            data-testid="user-card"
                            bordered={true}
                            style={{width: 400}}
                            cover={<img alt={userName} src={image}/>}
                        >
                            <Meta
                                avatar={<Avatar src={thumbnail}/>}
                                title={userName}
                                description={
                                    <div>
                                        <p>Name: {firstName} {lastName}</p>
                                        <p>{email}</p>
                                        <p>Address:
                                            Street: <span>{location.street}</span>,
                                            City: <span>{location.city}</span>,
                                            State: <span>{location.state}</span>,
                                            PostCode: <span>{location.postcode}</span>
                                        </p>
                                        <p>Phone: <span>{phone}</span></p>
                                        <p>Cell: <span>{cell}</span></p>
                                    </div>
                                }
                            />

                        </Card>
                    </Col>
                </Row>

            </Modal>
        );
    }
}

UserDetailsModel.propTypes = {
    onClose: PropTypes.func.isRequired,
    user: PropTypes.shape(DetailedUserType),
};
export default UserDetailsModel;