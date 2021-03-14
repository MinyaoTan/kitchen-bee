import React, { Component } from 'react';

import classes from './Recipe.module.css';

const recipe = () => (
    <div className={classes.Recipe}>
        <p>Title</p>
        <p>Ingredients</p>
        <p>Steps</p>
    </div>
);

export default recipe;