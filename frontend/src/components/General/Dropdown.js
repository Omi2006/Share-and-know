import React, { useState } from 'react';
import { useSpring, animated, config } from 'react-spring';
import { usePrefersReducedMotion } from './';
import '../../style/dropdown.css';

export default function Radio({ options, setSortBy, selected }) {
    const [isToggled, setIsToggled] = useState(false);
    const prefersReducedMotion = usePrefersReducedMotion();
    const toggleDropdown = () => setIsToggled(!isToggled);

    const menubg = useSpring({ background: isToggled ? '#68d8ee' : '#8ee4f5' });
    const { y } = useSpring({
        y: isToggled ? 180 : 0,
        immediate: prefersReducedMotion,
    });
    const menuAppear = useSpring({
        transform: isToggled ? 'translateY(0)' : 'translateY(-40px)',
        opacity: isToggled ? 1 : 0,
        config: config.gentle,
        immediate: prefersReducedMotion,
    });

    const handleSetOption = option => {
        //Wait for items to disappear before toggle
        setTimeout(toggleDropdown, 0.01);
        setSortBy(option);
    };

    return (
        <div className="radio-container">
            <animated.button
                style={menubg}
                data-testid="toggle"
                className="radio-wrapper"
                onClick={toggleDropdown}
            >
                <div className="radio">
                    <p className="visually-hidden">Change sort options</p>
                    <p>{selected}</p>
                    <animated.p
                        style={{
                            transform: y.interpolate(y => `rotateX(${y}deg)`),
                        }}
                    >
                        {isToggled ? 'X' : '▼'}
                    </animated.p>
                </div>
            </animated.button>
            <animated.div style={menuAppear} config={config.wobbly}>
                {isToggled && (
                    <div className="radio-content">
                        {options.map(option => (
                            <div
                                onClick={() => handleSetOption(option)}
                                key={option[0]}
                            >
                                <button>{option[1]}</button>
                            </div>
                        ))}
                    </div>
                )}
            </animated.div>
        </div>
    );
}
