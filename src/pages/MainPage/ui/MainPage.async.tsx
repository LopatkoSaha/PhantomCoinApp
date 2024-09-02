import { lazy } from 'react';

export const MainPageAsync = lazy(
    () =>
        new Promise((resolve) => {
            // @ts-expect-error setTimeout no used is real projects
            setTimeout(() => resolve(import('./MainPage')), 1500);
        }),
);
