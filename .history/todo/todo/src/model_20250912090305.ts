import type { Model } from "./types";

const model: Model = Object.freeze({
    input: null,
    tasks: [
        {
            description: 'Lage model',
            isFinished: true,
        },
        {
            description: 'Lage view',
            isFinished: false,
        },
        {
            description: 'Lage controller',
            isFinished: false,
        },

    ],
});

export { model };