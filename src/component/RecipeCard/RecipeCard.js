import React from 'react';

import classes from './RecipeCard.module.css';
import Button from '../UI/Button/Button';

const recipeCard = (props) => (
    <div className={classes.RecipeCard}>
        <Button btnType="Success" onClick={() => props.edit(props.id)}>Edit</Button>
        <h3 onClick={() => props.onClick(props.id)}>{props.title}</h3>
        <p>{props.author}</p>
    </div>
);

export default recipeCard;