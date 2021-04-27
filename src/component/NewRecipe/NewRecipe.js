import React, { Component } from 'react';
import axios from 'axios';

import classes from './NewRecipe.module.css';
import Step from '../Step/Step';
import NewStep from '../NewStep/NewStep';
import Button from '../UI/Button/Button';

class NewRecipe extends Component {
    state = {
        currentStep: 0,
        data: {
            steps: [],
            title: '',
            author: '',
            ingredients: ''
        }       
    };

    componentDidMount() {
        if (this.props.match.url.includes('editRecipe')) {
            axios.get('https://kitchen-bee-6359c-default-rtdb.firebaseio.com/recipes/' + this.props.match.params.id + '.json')
            .then(response => {
                this.setState({data: response.data, currentStep: response.data.steps.length});
            });
        }
    }

    // componentDidUpdate() {
    //     console.log(this.state.data);
    // }

    onSaveHandler = (id, desc) => {
        const newData = Object.assign({}, this.state.data);
        this.setState((prevState) => {
            return {
                currentStep: prevState.currentStep + 1,
                data: {
                    ...newData,
                    steps: prevState.data.steps.concat(desc)
                }
            };
        });
    }

    stepDeleteHandler = (id) => {
        const newData = Object.assign({}, this.state.data);
        this.setState((prevState) => {
            return {
                currentStep: prevState.currentStep - 1,
                data: {
                    ...newData,
                    steps: prevState.data.steps.filter((step, index) => index !== id)
                }    
            };
        });
    }

    titleChangedHandler = (event) => {
        const newData = Object.assign({}, this.state.data);
        this.setState({
            data: {
                ...newData,
                title: event.target.value
            }           
        });
    }

    authorChangedHandler = (event) => {
        const newData = Object.assign({}, this.state.data);
        this.setState({
            data: {
                ...newData,
                author: event.target.value
            }           
        });
    }

    ingredientsChangedHandler = (event) => {
        const newData = Object.assign({}, this.state.data);
        this.setState({
            data: {
                ...newData,
                ingredients: event.target.value
            }           
        });
    }

    saveRecipeHandler = () => {
        if (this.props.match.url.includes('editRecipe')) {
            axios.put('https://kitchen-bee-6359c-default-rtdb.firebaseio.com/recipes/' + this.props.match.params.id + '.json', {
                ...this.state.data
            })
            .then(response => {
                this.props.history.push('/');
            });
        } else {
            axios.post('https://kitchen-bee-6359c-default-rtdb.firebaseio.com/recipes.json', this.state.data)
            .then(response => {
                this.props.history.push('/');
            });
        }
    }

    render() {
        const steps = this.state.data.steps.map((step, index) => (
            <Step key={index} id={index} desc={step} delete={this.stepDeleteHandler} />
        ));
        return (
            <div className={classes.NewRecipe}>
                <input type="text" placeholder="Recipe Title" onChange={(event) => this.titleChangedHandler(event)} value={this.state.data.title} />
                <input type="text" placeholder="Recipe Author" onChange={(event) => this.authorChangedHandler(event)} value={this.state.data.author} />
                <textarea type="text" 
                    placeholder="List ingredients here..." 
                    rows="5"
                    onChange={(event) => this.ingredientsChangedHandler(event)}
                    value={this.state.data.ingredients} />
                {steps}
                <NewStep id={this.state.currentStep} onSave={this.onSaveHandler} />
                <Button btnType="Success" onClick={this.saveRecipeHandler}>Save Recipe</Button>
            </div>
        );
    }
} 

export default NewRecipe;