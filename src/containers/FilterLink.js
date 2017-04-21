import React, {Component, PropTypes} from 'react';

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

class FilterLink extends Component {

    componentDidMount() {
        const { store } = this.context;
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const { store } = this.context;
        const props = this.props;
        const state = store.getState();

        return (
            <Link active={
                props.filter === state.visibilityFilter
            } onClick={() =>
                store.dispatch({
                    type: 'SET_VISIBILITY_FILTER',
                    filter:props.filter
                })
            }>{props.children}</Link>
        );

    }

}

FilterLink.contextTypes = {
    store: PropTypes.object
};

export default FilterLink;