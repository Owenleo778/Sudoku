import Tile from "./tile";

export class Sudoku {

    static readonly size: number = 3;
    private readonly grid: Tile[][];

    constructor() {
        this.grid = [];
        for (let i = 0; i < Sudoku.size; i++){
            for (let j = 0; j < Sudoku.size; j++){
                this.grid[i][j] = new Tile();
            }
        }
    }

    display(): void {
        for (let i = 0; i < Sudoku.size; i++){
            for (let j = 0; j < Sudoku.size; j++){
                console.log(`(${i}, ${j}): ${this.grid[i][j]}`);
            }
        }
    }

    insert(i: number, j: number, n: number): boolean {
        console.log(i + j + n);
        //this.grid[i][j] = n;
        return true;
    }

    /**
     * @param i the column coordinate
     * @param j the row coordinate
     * @return true if both i and j are within the boundary
     */
    validCoordinates(i: number, j: number): boolean {
        return this.validCoordinate(i) && this.validCoordinate(j);
    }

    /**
     * @param c the coordinate to check
     * @return true if the param c is within the range [0, size^2]
     */
    validCoordinate(c: number): boolean {
        return c >= 0 && c <= Math.pow(Sudoku.size, 2);
    }

}
