import PropTypes from 'prop-types';
import SimpleUserType from  "./SimpleUserType";
const {shape, string } = PropTypes;

export default {
    ...SimpleUserType,
    location: shape({
        street: string.isRequired,
        city: string.isRequired,
        state: string.isRequired,
        postcode: string.isRequired
    }),
    phone: string.isRequired,
    cell: string.isRequired
}

