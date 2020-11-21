import React from 'react';
import { useTransition, animated } from 'react-spring';
import { CardColumns } from 'reactstrap';
import Row from './Row';

export default function HubList({ hubs }) {
    const transitions = useTransition(hubs, hub => hub.id, {
        from: {
            transform: 'translate3D(0px, 100px, 0px)',
        },
        enter: {
            transform: 'translate3D(0px, 0px, 0px',
        },
    });

    return (
        <CardColumns>
            {transitions.map(({ item, key, props }) => (
                <animated.div style={props} key={key}>
                    <Row hub={item} />
                </animated.div>
            ))}
        </CardColumns>
    );
}
