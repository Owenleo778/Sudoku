/**
 * A class denoting a subsection of the sudoku grid.
 * Stores 9 positions for numbers to be placed
 */
export class Tile {

    private grid: number[][];

    constructor() {
        this.grid = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++){
                this.grid[i][j] = -1;
            }
        }
    }

    /**
     * Simply prints out each number, with it's respective coordinates
     */
    display(): void {
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                console.log(`(${i}, ${j}): ${this.grid[i][j]}`);
            }
        }
    }

    /**
     * Inserts the given number into the grid
     * @param i the column
     * @param j the row
     * @param n the number in question
     * @return true if it was inserted, false if it failed
     */
    insert(i: number, j: number, n: number): boolean {
        if (this.contains(n) || this.grid[i][j] !== -1)
            return false;

        this.grid[i][j] = n;
        return true;
    }

    /**
     * @param n the number to check this grid contains
     * @return true if n is stored within the grid
     */
    contains(n: number): boolean {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.grid[i][j] === n)
                    return true;
            }
        }
        return false;
    }

    /**
     * Checks if the given number is between 1 and 9
     * @param n the number to check
     */
    valid(n: number): boolean {
        return n > 0 && n < 10;
    }

}
