import PropTypes from 'prop-types';
const { string } = PropTypes;

export default {
    id: string,
    firstName: string.isRequired,
    userName: string.isRequired,
    lastName: string.isRequired,
    thumbnail: string.isRequired
};
