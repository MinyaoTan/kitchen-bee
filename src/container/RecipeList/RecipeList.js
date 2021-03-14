import React, { Component } from 'react';

import RecipeCard from '../../component/RecipeCard/RecipeCard';

class RecipeList extends Component {
    render() {
        return (
            <div>
                <RecipeCard />
                <RecipeCard />
                <RecipeCard />
            </div>
        );
    }
}

export default RecipeList;