import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import RecipeList from '../RecipeList/RecipeList';
import Toolbar from '../../component/UI/Toolbar/Toolbar';
import NewRecipe from '../../component/NewRecipe/NewRecipe';
import Recipe from '../../component/Recipe/Recipe';

class Book extends Component {
    render() {
        return (
            <div>
                <Toolbar />
                <Switch>
                <Route path="/editRecipe:id" component={NewRecipe} />
                    <Route path="/recipe:id" component={Recipe} />
                    <Route path="/newRecipe" component={NewRecipe} />
                    <Route path="/" component={RecipeList} />
                </Switch>
            </div>
        );
    }
}

export default Book;