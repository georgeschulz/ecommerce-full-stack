import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ant from '../../assets/pest icons/ants.png';
import './pestButton.css';
import { useDispatch } from 'react-redux';
import { updateSelectedPest } from '../../features/wizardSlice';

function PestButton(props) {
    const { img, name, redirect } = props;
    const dispatch = useDispatch();

    const handleClick = (e) => {
        dispatch(updateSelectedPest({pest: name}));
    }

    return (
        <Link to={redirect}>
            <img src={img} className="pest-button" onClick={handleClick} />
        </Link>
    );
}

export default PestButton;