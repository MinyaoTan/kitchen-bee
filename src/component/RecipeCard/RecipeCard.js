import React from 'react';

import classes from './RecipeCard.module.css';

const recipeCard = () => (
    <div className={classes.RecipeCard}>
        <p>Title</p>
        <p>Author, Date</p>
    </div>
);

export default recipeCard;