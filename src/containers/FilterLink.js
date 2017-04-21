import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

import { setVisibilityFilter } from './../actions/index';

const Link = ({active, onClick, children}) => {
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Link);