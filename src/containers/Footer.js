import React, {PropTypes} from 'react';

import FilterLink from './FilterLink'

const Footer = (props, {store}) => {
    return (
        <p>
            Show: { ' ' }
            <FilterLink store={store} filter="SHOW_ALL">All</FilterLink>{ ' ' }
            <FilterLink store={store} filter="SHOW_ACTIVE">Active</FilterLink>{ ' ' }
            <FilterLink store={store} filter="SHOW_COMPLETED">Completed</FilterLink>
        </p>
    )
};

Footer.contextTypes = {
    store: PropTypes.object
};

export default Footer;
