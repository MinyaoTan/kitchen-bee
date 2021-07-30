import React, { Component, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

// import RecipeList from '../RecipeList/RecipeList';
import Toolbar from '../../component/UI/Toolbar/Toolbar';
// import NewRecipe from '../../component/NewRecipe/NewRecipe';
// import Recipe from '../../component/Recipe/Recipe';
// import SearchResult from '../SearchResult/SearchResult';

const SearchResult = React.lazy(() => import('../SearchResult/SearchResult'));
const NewRecipe = React.lazy(() => import('../../component/NewRecipe/NewRecipe'));
const Recipe = React.lazy(() => import('../../component/Recipe/Recipe'));
const RecipeList = React.lazy(() => import('../RecipeList/RecipeList'));


class Book extends Component {
    render() {
        return (
            <div>
                <Suspense fallback={<p>Loading...</p>}>
                    <Toolbar />
                    <Switch>
                        <Route path="/searchResult" component={SearchResult} />
                        <Route path="/editRecipe:id" component={NewRecipe} />
                        <Route path="/recipe:id" component={Recipe} />
                        <Route path="/newRecipe" component={NewRecipe} />
                        <Route path="/" component={RecipeList} />
                    </Switch>
                </Suspense>
            </div>
        );
    }
}

export default Book;