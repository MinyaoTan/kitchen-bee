import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import RecipeList from '../RecipeList/RecipeList';
import Toolbar from '../../component/UI/Toolbar/Toolbar';

class Book extends Component {
    render() {
        return (
            <div>
                <Toolbar />
                <Route path="/" component={RecipeList} />
            </div>
        );
    }
}

export default Book;