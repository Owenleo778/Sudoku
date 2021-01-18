export class Sudoku {

    private grid: number[][];

    constructor() {
        this.grid = [];
        for (let i = 0; i < 9; i++){
            for (let j = 0; j < 9; j++){
                this.grid[i][j] = -1;
            }
        }
    }

    display(): void {
        for (let i = 0; i < 9; i++){
            for (let j = 0; j < 9; j++){
                console.log(`(${i}, ${j}): ${this.grid[i][j]}`);
            }
        }
    }

}
