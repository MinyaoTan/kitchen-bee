import React from 'react';

import classes from './NewRecipe.module.css';

const newRecipe = () => (
    <div className={classes.NewRecipe}>
        <input type="text" placeholder="Recipe Title" />
        <input type="text" placeholder="Recipe Author" />
        <p>Step 1:</p>
        <textarea />
    </div>
);

export default newRecipe;