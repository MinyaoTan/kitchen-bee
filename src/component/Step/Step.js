import React from 'react';

import classes from './Step.module.css';
import Button from '../UI/Button/Button';

const step = (props) => (
    <div className={classes.Step}>
        <hr />
        <h3>Step {props.id}</h3>
        <p>{props.desc}</p>
        <Button btnType="Danger" onClick={() => props.delete(props.id)}>Delete</Button>
    </div>
);

export default step;