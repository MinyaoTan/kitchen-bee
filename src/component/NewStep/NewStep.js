import React, { Component } from 'react';

import Button from '../UI/Button/Button';
import classes from './NewStep.module.css';

class newStep extends Component {
    state = {
        desc: ''
    };

    textareaOnchangeHandler = (event) => {
        this.setState({desc: event.target.value});
    }

    onSaveHandler = () => {
        this.setState({desc: ''});
        this.props.onSave(this.props.id, this.state.desc);
    }

    render() {
        return (
            <div className={classes.NewStep}>
                <p>Step {this.props.id}</p>
                <textarea type="text" 
                    placeholder="Step Description" 
                    rows="5" 
                    onChange={(event) => this.textareaOnchangeHandler(event)} 
                    value={this.state.desc} />
                <Button btnType="Success" onClick={this.onSaveHandler}>Add Step</Button>
            </div>
        );
    }
}

export default newStep;