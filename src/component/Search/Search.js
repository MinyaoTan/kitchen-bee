import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Button from '../UI/Button/Button';
import * as actionType from '../../store/actionType';

class Search extends Component {
    state = {
        target: ''
    }

    searchTargetChangedHandler = (event) => {
        this.setState({target: event.target.value});
    }

    searchClickedHandler = () => {
        this.props.onSearchTargetChange(this.state.target);
        this.props.history.push('/searchResult');
    }

    render() {
        return (
            <div>
                <input type="text" onChange={(event) => this.searchTargetChangedHandler(event)} />
                <Button btnType="Success" onClick={this.searchClickedHandler}>Search</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        target: state.searchTarget
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSearchTargetChange: (target) => dispatch({type: actionType.CHANGE_SEARCH_TARGET, target: target})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Search));