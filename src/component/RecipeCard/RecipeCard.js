import React from 'react';

import classes from './RecipeCard.module.css';

const recipeCard = (props) => (
    <div className={classes.RecipeCard}>
        <h3 onClick={() => props.onClick(props.id)}>{props.title}</h3>
        <p>{props.author}</p>
    </div>
);

export default recipeCard;