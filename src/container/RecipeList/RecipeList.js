import React, { Component } from 'react';
import axios from 'axios';

import RecipeCard from '../../component/RecipeCard/RecipeCard';

class RecipeList extends Component {
    state = {
        boundaries: [0, 2],
        recipes: []
    }

    componentDidMount() {
        axios.get('https://kitchen-bee-6359c-default-rtdb.firebaseio.com/recipes.json')
            .then(response => {
                const recipes = Object.entries(response.data).slice(this.state.boundaries[0], this.state.boundaries[1]);
                this.setState((prevState) => {
                    return {
                        recipes: recipes,
                        boundaries: [prevState.boundaries[0] + 2, prevState.boundaries[1] + 2]
                    }
                });
            })
    }

    render() {
        const recipes = this.state.recipes.map(recipe => (
            <RecipeCard key={recipe[0]} title={recipe[1].title} author={recipe[1].author} />
        ));
        return (
            <div>
                {recipes}
            </div>
        );
    }
}

export default RecipeList;