// type Model = {
//     points: number;
//     pointsPerClick: number;
//     smileyIndex: number;
// };

// DATA: Type definitions - describes the shape of our data
interface Model {
    points: number;
    pointsPerClick: number;
    smileyIndex: number;
    backgroundColor: string
    color: string;
    // autoClickers: boolean;
}

export type { Model };