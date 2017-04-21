import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import { setVisibilityFilter } from './../actions/index';

const Link = ({active, children, onClick}) => {
    if (active) {
        return <span>{children}</span>
    }

    return (
        <a href='#'
           onClick={(e) => {
            e.preventDefault();
            onClick();
           }}>{children}</a>
    )
};

const mapStateToProps = (state, props) => {
    return {
        active: props.filter === state.visibilityFilter
    }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
      onClick: () => dispatch(setVisibilityFilter(props.filter))
  }
};

const FilterLink = connect(
    mapStateToProps,
    mapDispatchToProps
)(Link);

export default FilterLink;