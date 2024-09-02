import { lazy } from 'react';

export const AboutPageAsync = lazy(
    () =>
        new Promise((resolve) => {
            // @ts-expect-error setTimeout no used is real projects
            setTimeout(() => resolve(import('./AboutPage')), 1500);
        }),
);
