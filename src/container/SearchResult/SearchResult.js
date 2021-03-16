import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Search from '../../component/Search/Search';
import Button from '../../component/UI/Button/Button';
import * as actionType from '../../store/actionType';
import RecipeCard from '../../component/RecipeCard/RecipeCard';

const pageItems = 2;

class SearchResult extends Component {
    componentDidMount() {
        if (this.props.target === '') {
            this.props.history.push('/');
        } else {
            axios.get('https://kitchen-bee-6359c-default-rtdb.firebaseio.com/recipes.json')
                .then(response => {
                    const result = Object.entries(response.data)
                        .filter(recipe => recipe[1].title.includes(this.props.target));
                    this.props.onPopulateResult(result);
                    const recipes = result.slice(this.props.boundaries[0], this.props.boundaries[1]);
                    this.props.onRecipesUpdate(recipes);
                });
        }
    }

    nextClickedHandler = () => {
        const recipes = this.props.result.slice(this.props.boundaries[0] + pageItems, this.props.boundaries[1] + pageItems);
        this.props.onBoundariesChange(1);
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
    }

    previousClickedHandler = () => {
        this.props.onDisableNext(false);
        const recipes = this.props.result.slice(this.props.boundaries[0] - pageItems, this.props.boundaries[1] - pageItems);
        this.props.onBoundariesChange(0);
        if (recipes.length > 0) {
            this.props.onRecipesUpdate(recipes);
            this.props.onPageUpdate(-1);
        }
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
        result: state.searchResult,
        target: state.searchTarget,
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
        onPopulateResult: (result) => dispatch({type: actionType.POPULATE_RESULT, result: result})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);