import Tile from "./tile";

export class Sudoku {

    static readonly size: number = 3;
    grid: Tile[][];

    constructor() {
        this.grid = [...Array(Sudoku.size)].map(() => Array(Sudoku.size));

        for (let i = 0; i < Sudoku.size; i++){
            for (let j = 0; j < Sudoku.size; j++){
                this.grid[i][j] = new Tile();
            }
        }
    }

    insert(i: number, j: number, n: number): boolean {
        if (!this.validCoordinates(i, j) || !Sudoku.validNumber(n))
            return false;

        // Tile coordinates
        const tileI: number = Math.floor(i / Sudoku.size);
        const tileJ: number = Math.floor(j / Sudoku.size);
        // coordinates to insert of the Tile
        const numI: number = i - tileI * Sudoku.size;
        const numJ: number = j - tileJ * Sudoku.size;

        // check if viable from other tiles
        // i.e all tiles in the same row / column, that none of those don't have this number in the same tile row / column
        // not scalable with the param `size`
        for (let col = 0; col < Sudoku.size; col++){
            for (let row = 0; row < Sudoku.size; row++){
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

        //if this placement doesn't violate any other tile placement rules, attempt to place within the specified tile
        return this.grid[tileI][tileJ].insert(numI, numJ, n);
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

    /**
     * Checks if the given number is between 1 and size^2 (normally 3^2 = 9)
     * @param n the number to check
     */
    public static validNumber(n: number): boolean {
        return n > 0 && n <= Math.pow(this.size, 2) ;
    }

}

const s = new Sudoku();
s.insert(1,1,7);
s.insert(6,1,7);

s.grid[0][0].display();
console.log("-")
s.grid[2][0].display();