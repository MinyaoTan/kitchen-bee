import React from 'react';

import NavItem from './NavItem/NavItem';
import classes from './Toolbar.module.css';

const toolbar = () => (
    <ul className={classes.Toolbar}>
        <NavItem link="/" exact>Recipes</NavItem>
        <NavItem link="/newRecipe">New Recipe</NavItem>
    </ul>
);

export default toolbar;