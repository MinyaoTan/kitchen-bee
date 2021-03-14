import React, { Component } from 'react';

import classes from './NewRecipe.module.css';
import Step from '../Step/Step';
import NewStep from '../NewStep/NewStep';

class NewRecipe extends Component {
    state = {
        currentStep: 0,
        steps: []
    };

    onSaveHandler = (id, desc) => {
        this.setState((prevState) => {
            return {
                currentStep: prevState.currentStep + 1,
                steps: prevState.steps.concat({id: id, description: desc})
            };
        });
    }

    stepDeleteHandler = (id) => {
        this.setState((prevState) => {
            return {
                currentStep: prevState.currentStep - 1,
                steps: prevState.steps.filter((step, index) => index !== id)
            };
        });
    }

    render() {
        const steps = this.state.steps.map((step, index) => (
            <Step key={index} id={index} desc={step.description} delete={this.stepDeleteHandler} />
        ));
        return (
            <div className={classes.NewRecipe}>
                <input type="text" placeholder="Recipe Title" />
                <input type="text" placeholder="Recipe Author" />
                {steps}
                <NewStep id={this.state.currentStep} onSave={this.onSaveHandler} />
            </div>
        );
    }
} 

export default NewRecipe;