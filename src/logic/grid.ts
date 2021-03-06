import Tile from "./tile";

/**
 * Contains all logic for the board state of the sudoku puzzle
 */
export default class Grid {

    static readonly size: number = 3;
    grid: Tile[][];
    public count: number;

    constructor() {
        this.grid = [...Array(Grid.size)].map(() => Array(Grid.size));
        this.count = 0;

        for (let i = 0; i < Grid.size; i++){
            for (let j = 0; j < Grid.size; j++){
                this.grid[i][j] = new Tile();
            }
        }
    }

    /**
     * inserts a number n, into position (i,j) of the grid
     * @param i the grid column
     * @param j the grid row
     * @param n the number to insert
     * @return true if the number n was successfully inserted
     */
    insert(i: number, j: number, n: number): boolean {
        if (!this.validCoordinates(i, j) || !Grid.validNumber(n))
            return false;

        const tileI: number = this.tileCoordinate(i);
        const tileJ: number = this.tileCoordinate(j);
        const numI: number = this.numberCoordinate(i, tileI);
        const numJ: number = this.numberCoordinate(j, tileJ);

        if (!this.validMove(tileI, tileJ, numI, numJ, n))
            return false;

        //if this placement doesn't violate any other tile placement rules, attempt to place within the specified tile
        const inserted = this.grid[tileI][tileJ].insert(numI, numJ, n);
        if (inserted)
            this.count++;
        return inserted;
    }

    /**
     * @param tileI the tile column
     * @param tileJ the tile row
     * @param numI the column to insert the number in of the tile
     * @param numJ the row to insert the number in of the tile
     * @param n the number to insert
     * @return true if this move would not clash with any other tile (other than the one being inserted into)
     */
    private validMove(tileI: number, tileJ: number, numI: number, numJ: number, n: number): boolean {
        // check if viable from other tiles
        // i.e all tiles in the same row / column, that none of those don't have this number in the same tile row / column
        // not scalable with the param `size`
        for (let col = 0; col < Grid.size; col++){
            for (let row = 0; row < Grid.size; row++){
                const inC = col === tileI;
                const inR = row === tileJ;
                if (!inC !== !inR) { // equivalent of: inC XOR inR
                    if (inC)
                        if (this.grid[col][row].inColumn(numI, n))
                            return false;
                        else if (inR)
                            if (this.grid[col][row].inRow(numJ, n))
                                return false;
                }
            }
        }
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
        return c >= 0 && c <= Math.pow(Grid.size, 2);
    }

    /**
     * Checks if the given number is between 1 and size^2 (normally 3^2 = 9)
     * @param n the number to check
     */
    public static validNumber(n: number): boolean {
        return n > 0 && n <= Math.pow(this.size, 2) ;
    }

    /**
     * Given a coordinate, determine which tile would hold it
     * i.e 1,1 resides in tile 0,0.
     * 8,5 resides in tile 2,1
     * @param globalC the global coordinate
     */
    tileCoordinate(globalC: number): number {
        return Math.floor(globalC / Grid.size);
    }

    /**
     * Given the parameters, determine the position within the tile that they refer to
     * i.e global coordinates 7,6 refers to position 1,0 of tile 2,2
     * @param globalC the global coordinate
     * @param tileC the tile coordinate
     */
    numberCoordinate(globalC: number, tileC: number): number {
        return globalC - tileC * Grid.size;
    }

    /**
     * @TODO Ensure can't delete initial numbers (i.e the numbers that start in the sudoku grid)
     * Erases a number in the grid, by replacing it with -1
     * @param i the global column
     * @param j the global row
     */
    eraseNumber(i: number, j: number) {
        if (this.isComplete())
            return;
        const tileI: number = this.tileCoordinate(i);
        const tileJ: number = this.tileCoordinate(j);
        const numI: number = this.numberCoordinate(i, tileI);
        const numJ: number = this.numberCoordinate(j, tileJ);
        if (this.grid[tileI][tileJ].erase(numI, numJ))
            this.count--;
    }

    /**
     * @return true if the puzzle has been fully completed
     */
    isComplete(): boolean {
        // Since by definition, the puzzle is only complete on a full grid
        return this.count === Math.pow(Grid.size, 4);
    }

}
