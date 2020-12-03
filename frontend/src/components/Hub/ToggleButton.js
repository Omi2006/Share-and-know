import React from 'react';
import { Button } from 'reactstrap';
import { animated, useSpring, config } from 'react-spring';
import { usePrefersReducedMotion } from '../General';
import '../../style/hub.css';

export default function ToggleButton({ type, handleTypeChange }) {
    const prefersReducedMotion = usePrefersReducedMotion();
    const { transform, color } = useSpring({
        transform:
            type !== 'hubs' ? 'translate3D(100%,0,0)' : 'translate3d(0,0,0)',
        color: type !== 'hubs' ? 'white' : 'black',
        config: { ...config.molasses, friction: 60 },
        immediate: prefersReducedMotion,
    });

    return (
        <Button
            color="primary"
            className="lead type-toggle-button"
            onClick={handleTypeChange}
            style={{
                borderColor: type === 'hubs' && '#86eb93',
            }}
        >
            <animated.span style={{ color }} className="type-toggle-span">
                {type.charAt(0).toUpperCase() + type.slice(1)}
            </animated.span>
            <animated.div
                className="type-toggle-div"
                style={{
                    transform: transform,
                }}
            />
        </Button>
    );
}
