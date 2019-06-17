import React from 'react'
import {render} from '@testing-library/react'
import 'jest-dom/extend-expect'
import UserDetailsModel from './UserDetailsModel';
import {User} from '../../Services/UserService';

it('Renders users data in detail', () => {
    const testUserObj = {
        "gender": "male",
        "name": {
            "title": "mr",
            "first": "ethan",
            "last": "cole"
        },
        "location": {
            "street": "1684 north street",
            "city": "cardiff",
            "state": "south yorkshire",
            "postcode": "FK9Q 5ZY"
        },
        "email": "ethan.cole@example.com",
        "login": {
            "uuid": "42f282ce-5af3-4298-b8ee-8cd25eab3834",
            "username": "tinytiger565"
        },

        "phone": "016977 5585",
        "cell": "0759-277-184",
        "id": {
            "name": "NINO",
            "value": "HW 86 16 80 W"
        },
        "picture": {
            "large": "https://randomuser.me/api/portraits/men/16.jpg",
            "medium": "https://randomuser.me/api/portraits/med/men/16.jpg",
            "thumbnail": "https://randomuser.me/api/portraits/thumb/men/16.jpg"
        },
        "nat": "GB"
    };
    const testUser = User.createFromObj(testUserObj);
    const { getByTestId } = render(<UserDetailsModel onClose={() => {}} user={testUser} />);
    console.log(testUser);
    expect(getByTestId('user-card')).toHaveTextContent(testUser.location.street);
    expect(getByTestId('user-card')).toHaveTextContent(testUser.location.postcode);
    expect(getByTestId('user-card')).toHaveTextContent(testUser.location.state);
});