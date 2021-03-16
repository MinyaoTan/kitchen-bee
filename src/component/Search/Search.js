import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Button from '../UI/Button/Button';

class Search extends Component {
    state = {
        target: ''
    }

    searchTargetChangedHandler = (event) => {
        this.setState({search: event.target.value});
    }

    searchClickedHandler = () => {
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

export default withRouter(Search);