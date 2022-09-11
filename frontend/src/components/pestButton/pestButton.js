import React from 'react';
import { Link } from 'react-router-dom';
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
            <img src={img} className="pest-button" onClick={handleClick} alt={name} />
        </Link>
    );
}

export default PestButton;