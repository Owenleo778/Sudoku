/**
 * A class denoting a subsection of the sudoku grid.
 * Stores 9 positions for numbers to be placed
 */
export class Tile {

    readonly size: number = 3;
    private readonly grid: number[][];

    constructor() {
        this.grid = [];
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++){
                this.grid[i][j] = -1;
            }
        }
    }

    /**
     * Simply prints out each number, with its respective coordinates
     */
    display(): void {
        for (let i = 0; i < this.size; i++){
            for (let j = 0; j < this.size; j++){
                console.log(`(${i}, ${j}): ${this.grid[i][j]}`);
            }
        }
    }

    /**
     * Inserts the given number into the grid
     * @param i the column
     * @param j the row
     * @param n the number to insert into the grid
     * @return true if it was inserted, false if it failed
     */
    insert(i: number, j: number, n: number): boolean {
        if (!this.validNumber(n) || this.contains(n) || !this.isEmpty(i, j))
            return false;

        this.grid[i][j] = n;
        return true;
    }

    /**
     * @param i the column
     * @param j the row
     * @return true if the position (i,j) is empty
     */
    isEmpty(i: number, j: number):boolean {
        return this.grid[i][j] === -1;
    }

    /**
     * @param n the number to check for
     * @return true if n is stored within the grid
     */
    contains(n: number): boolean {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.grid[i][j] === n)
                    return true;
            }
        }
        return false;
    }

    /**
     * @param i the column
     * @param n the number to check for
     * @return true if n appears in column j
     */
    inColumn(i: number, n: number): boolean {
        for (let j = 0; j < this.size; j++) {
            if (this.grid[i][j] === n)
                return true;
        }
        return false;
    }

    /**
     * @param j the row
     * @param n the number to check for
     * @return true if n appears in row j
     */
    inRow(j: number, n: number): boolean {
        for (let i = 0; i < this.size; i++) {
            if (this.grid[i][j] === n)
                return true;
        }
        return false;
    }

    /**
     * Checks if the given number is between 1 and size^2 (normally 3^2 = 9)
     * @param n the number to check
     */
    validNumber(n: number): boolean {
        return n > 0 && n <= Math.pow(this.size, 2) ;
    }

}
