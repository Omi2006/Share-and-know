import { useState, useEffect } from 'react';

//Hook used for accesibility purposes to disable animations

const getInitialState = () =>
    !window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

export default function usePrefersReducedMotion() {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(
        getInitialState
    );

    useEffect(() => {
        const mediaQueryList = window.matchMedia(
            '(prefers-reduced-motion: no-preference)'
        );
        mediaQueryList.addEventListener('change', event => {
            setPrefersReducedMotion(!event.matches);
        });

        return () => {
            mediaQueryList.removeEventListener('change', event => {
                setPrefersReducedMotion(!event.matches);
            });
        };
    }, []);
    return prefersReducedMotion;
}
