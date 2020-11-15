import React, { useState } from 'react';
import { useSpring, animated, config } from 'react-spring';

import '../../style/dropdown.css';

export default function Radio({ options, setSortBy, selected }) {
    const [isToggled, setToggle] = useState(false);
    const menubg = useSpring({ background: isToggled ? '#68d8ee' : '#8ee4f5' });
    const { y } = useSpring({
        y: isToggled ? 180 : 0,
    });
    const menuAppear = useSpring({
        transform: isToggled
            ? 'translate3D(0,0,0)'
            : 'translate3D(0,-40px,50px)',
        opacity: isToggled ? 1 : 0,
        zIndex: 2,
        immediate: key => key === 'zIndex',
    });

    const handleSetOption = option => {
        //Wait for items to disappear before toggle
        setTimeout(() => setToggle(false), 0.01);
        setSortBy(option);
    };

    return (
        <div
            style={{
                position: 'relative',
                width: '250px',
                margin: '0 auto',
            }}
        >
            <animated.button
                style={menubg}
                data-testid="toggle"
                className="radiowrapper"
                onClick={() => setToggle(!isToggled)}
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
                    <div className="radiocontent">
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
