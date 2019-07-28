import React from 'react';
import PropTypes from 'prop-types';
import './Control.css';

const Control = ({letter, feedback, index, onClick}) => (
    <span className={`letter ${feedback}`} onClick={() => onClick(index)}>
        {letter}
    </span>
);

Control.propTypes = {
    letter: PropTypes.string.isRequired,
    feedback: PropTypes.oneOf(['right', 'wrong']),
    index: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Control