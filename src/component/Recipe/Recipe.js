import React, { Component } from 'react';
import axios from 'axios';

import Step from '../Step/Step';

class Recipe extends Component {
    state = {
        // data: {
        //     author: '',
        //     title: '',
        //     ingredients: '',
        //     steps: []
        // }
        data: null
    }

    componentDidMount() {
        axios.get('https://kitchen-bee-6359c-default-rtdb.firebaseio.com/recipes/' + this.props.match.params.id + '.json')
            .then(response => {
                this.setState({data: response.data});
            });
    }

    render() {
        let recipe = null;
        let steps = null;

        if (this.state.data !== null) {
            steps = this.state.data.steps.map((step, index) => (
                <Step key={index} id={index} desc={step} />
            ));

            recipe = (
                <div>
                    <h1>{this.state.data.title}</h1>
                    <h3>By {this.state.data.author}</h3>
                    <p>{this.state.data.ingredients}</p>
                    {steps}
                </div>
            );
        }

        return (
            <div>
                {recipe}
            </div>
        )
    }
}

export default Recipe;