import React from 'react';
import './style.css';
import flameImage from '../../../../assets/images/dashboard/920622-middle.png';

const FlameAnimation: React.FC = () => {
    return (
        <div className="flame-container">
            <img className="flame" src={flameImage} alt="Green Flame" />
        </div>
    );
};

export default FlameAnimation;

