import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import RecipeList from '../RecipeList/RecipeList';
import Toolbar from '../../component/UI/Toolbar/Toolbar';
import NewRecipe from '../../component/NewRecipe/NewRecipe';

class Book extends Component {
    render() {
        return (
            <div>
                <Toolbar />
                <Switch>
                    <Route path="/newRecipe" component={NewRecipe} />
                    <Route path="/" component={RecipeList} />
                </Switch>
            </div>
        );
    }
}

export default Book;