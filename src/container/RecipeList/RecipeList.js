import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';

import RecipeCard from '../../component/RecipeCard/RecipeCard';
import Button from '../../component/UI/Button/Button';
import Search from '../../component/Search/Search';

const pageItems = 5;

class RecipeList extends Component {
    state = {
        boundaries: [0, pageItems],
        recipes: [],
        page: 1,
        disableNext: false
    }

    componentDidMount() {
        this.getData();
    }

    recipeClickedHandler = (id) => {
        this.props.history.push('/recipe' + id);
    }

    nextClickedHandler = () => {
        axios.get('https://kitchen-bee-6359c-default-rtdb.firebaseio.com/recipes.json')
            .then(response => {
                this.setState((prevState) => {
                    return {
                        boundaries: [prevState.boundaries[0] + pageItems, prevState.boundaries[1] + pageItems]
                    }
                })
                const recipes = Object.entries(response.data).slice(this.state.boundaries[0], this.state.boundaries[1]);
                if (recipes.length == pageItems) {
                    this.setState({disableNext: false});
                } else {
                    this.setState({disableNext: true});
                }
                console.log(recipes.length);
                if (recipes.length > 0) {
                    this.setState((prevState) => {
                        return {
                            recipes: recipes,
                            page: prevState.page + 1
                        }
                    });
                } else {
                    this.setState((prevState) => {
                        return {
                            boundaries: [prevState.boundaries[0] - pageItems, prevState.boundaries[1] - pageItems]
                        }
                    })
                }
            })
    }

    previousClickedHandler = () => {
        axios.get('https://kitchen-bee-6359c-default-rtdb.firebaseio.com/recipes.json')
            .then(response => {
                this.setState((prevState) => {
                    return {
                        disableNext: false,
                        boundaries: [prevState.boundaries[0] - pageItems, prevState.boundaries[1] - pageItems]
                    }
                })
                const recipes = Object.entries(response.data).slice(this.state.boundaries[0], this.state.boundaries[1]);

                if (recipes.length > 0) {
                    this.setState((prevState) => {
                        return {
                            recipes: recipes,
                            page: prevState.page - 1
                        }
                    });
                }
            })
    }

    getData() {
        axios.get('https://kitchen-bee-6359c-default-rtdb.firebaseio.com/recipes.json')
            .then(response => {
                const recipes = Object.entries(response.data).slice(this.state.boundaries[0], this.state.boundaries[1]);
                if (recipes.length == pageItems) {
                    this.setState({disableNext: false});
                } else {
                    this.setState({disableNext: true});
                }

                if (recipes.length > 0) {
                    this.setState((prevState) => {
                        return {
                            recipes: recipes
                        }
                    });
                }
            })
    }

    recipeEditHandler = (id) => {
        this.props.history.push('/editRecipe' + id);
    }

    // searchClickedHandler = () => {
    //     axios.get('https://kitchen-bee-6359c-default-rtdb.firebaseio.com/recipes.json')
    //         .then(response => {
    //             const result = Object.entries(response.data).filter(recipe => recipe[1].title.includes(this.state.search));
    //             this.setState({
    //                 searchResult: result,
    //                 boundaries: [0, pageItems],
    //                 page: 1,
    //                 disableNext: false
    //             });
    //             this.setState({
    //                 recipes: result.slice(this.state.boundaries[0], this.state.boundaries[1])
    //             });
    //         });
    // }

    // searchTargetChangedHandler = (event) => {
    //     this.setState({search: event.target.value});
    // }

    render() {
        const recipes = this.state.recipes.map(recipe => (
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
                <p>Page {this.state.page}</p>
                <Button btnType="Success" onClick={this.previousClickedHandler} disabled={this.state.page === 1}>Previous</Button>
                <Button btnType="Success" onClick={this.nextClickedHandler} disabled={this.state.disableNext}>Next</Button>
            </div>
        );
    }
}

export default RecipeList;