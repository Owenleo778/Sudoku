import Grid from "./grid";

/**
 * A class denoting a subsection of the sudoku Grid.
 * Stores a number of integers with capacity and range equal to the square of the
 * number passed in at construction (default 3)
 */
export default class Tile {

    private readonly size: number = Grid.size
    private readonly grid: number[][];
    // add a hashmap to keep track of current numbers stored + coordinates?

    constructor() {
        this.grid = this.grid = [...Array(this.size)].map(() => Array(this.size));

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
        if (!Grid.validNumber(n) || this.contains(n) || !this.isEmpty(i, j) || !this.validCoordinates(i, j))
            return false;

        this.grid[i][j] = n;
        return true;
    }

    /**
     * removes a number, if it exists, at (i, j)
     * @param i the tile column
     * @param j the tile row
     * @return true if a number was successfully erased
     */
    erase(i: number, j: number): boolean {
        if (!this.validCoordinates(i, j) || this.isEmpty(i, j))
            return false;

        this.grid[i][j] = -1;
        return true
    }

    /**
     * @param i the tile column
     * @param j the tile row
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
        // use a hashmap and check instead? Depends on frequency of usage
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.grid[i][j] === n)
                    return true;
            }
        }
        return false;
    }

    /**
     * @param i the tile column
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
     * @param j the tile row
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
     * @param i the column coordinate
     * @param j the row coordinate
     * @return true if both i and j are within the boundary
     */
    validCoordinates(i: number, j: number): boolean {
        return this.validCoordinate(i) && this.validCoordinate(j);
    }

    /**
     * @param c the coordinate to check
     * @return true if the param c is within the range [0, size]
     */
    validCoordinate(c: number): boolean {
        return c >= 0 && c <= this.size;
    }

}
