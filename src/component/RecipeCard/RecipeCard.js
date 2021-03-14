import React, { Component } from 'react';

import classes from './RecipeCard.module.css';

const recipe = () => (
    <div className={classes.RecipeCard}>
        <p>Title</p>
        <p>Author, Date</p>
    </div>
);

export default recipe;