import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import RecipeCard from '../../component/RecipeCard/RecipeCard';
import Button from '../../component/UI/Button/Button';
import Search from '../../component/Search/Search';
import * as actionType from '../../store/actionType';

const pageItems = 2;

class RecipeList extends Component {

    componentDidMount() {
        this.props.onResetState();
        this.getData();
    }

    recipeClickedHandler = (id) => {
        this.props.history.push('/recipe' + id);
    }

    nextClickedHandler = () => {
        axios.get('https://kitchen-bee-6359c-default-rtdb.firebaseio.com/recipes.json')
            .then(response => {
                this.props.onBoundariesChange(1);
                const recipes = Object.entries(response.data).slice(this.props.boundaries[0], this.props.boundaries[1]);
                if (recipes.length == pageItems) {
                    this.props.onDisableNext(false);
                } else {
                    this.props.onDisableNext(true);
                }
                
                if (recipes.length > 0) {
                    this.props.onRecipesUpdate(recipes);
                    this.props.onPageUpdate(1);
                } else {
                    this.props.onBoundariesChange(0);
                }
            })
    }

    previousClickedHandler = () => {
        axios.get('https://kitchen-bee-6359c-default-rtdb.firebaseio.com/recipes.json')
            .then(response => {
                this.props.onBoundariesChange(0);
                this.props.onDisableNext(false);
                const recipes = Object.entries(response.data).slice(this.props.boundaries[0], this.props.boundaries[1]);

                if (recipes.length > 0) {
                    this.props.onRecipesUpdate(recipes);
                    this.props.onPageUpdate(-1);
                }
            })
    }

    getData() {
        axios.get('https://kitchen-bee-6359c-default-rtdb.firebaseio.com/recipes.json')
            .then(response => {
                const recipes = Object.entries(response.data).slice(this.props.boundaries[0], this.props.boundaries[1]);
                if (recipes.length === pageItems) {
                    this.props.onDisableNext(false);
                } else {
                    this.props.onDisableNext(true);
                }

                if (recipes.length > 0) {
                    this.props.onRecipesUpdate(recipes);
                }
            })
    }

    recipeEditHandler = (id) => {
        this.props.history.push('/editRecipe' + id);
    }

    render() {
        const recipes = this.props.recipes.map(recipe => (
            <RecipeCard 
                key={recipe[0]} 
                id={recipe[0]}
                title={recipe[1].title} 
                author={recipe[1].author}
                onClick={this.recipeClickedHandler}
                edit={this.recipeEditHandler} />
        ));
        return (
            <div>
                <Search />
                {recipes}
                <p>Page {this.props.page}</p>
                <Button btnType="Success" onClick={this.previousClickedHandler} disabled={this.props.page === 1}>Previous</Button>
                <Button btnType="Success" onClick={this.nextClickedHandler} disabled={this.props.disableNext}>Next</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        boundaries: state.boundaries,
        recipes: state.recipes,
        page: state.page,
        disableNext: state.disableNext
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onBoundariesChange: (value) => dispatch({type: actionType.CHANGE_BOUNDARIES, value: value}),
        onRecipesUpdate: (recipes) => dispatch({type: actionType.UPDATE_RECIPES, recipes: recipes}),
        onPageUpdate: (value) => dispatch({type: actionType.UPDATE_PAGE, value: value}),
        onDisableNext: (disable) => dispatch({type: actionType.DISABLE_NEXT, disable: disable}),
        onResetState: () => dispatch({type: actionType.RESET_STATE})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList);