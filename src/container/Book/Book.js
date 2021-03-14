import React, { Component } from 'react';

import RecipeList from '../RecipeList/RecipeList';

class Book extends Component {
    render() {
        return (
            <div>
                <p>Search</p>
                <RecipeList />
            </div>
        );
    }
}

export default Book;