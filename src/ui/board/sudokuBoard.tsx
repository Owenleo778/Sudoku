import React, {ReactElement} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    outerTile: {
        border: "5px solid black",
    },
    innerTile: {
        border: "2px solid gray",
    },
});

type Tile = {
    tile: number[][];
}

function createTile(): Tile {
    return { tile: [[1,2,3], [4,5,6], [7,8,9]]};
}

interface RowProps {
    row: Tile[];
    rowN: number;
}

const Row: React.FC<RowProps> = ({row, rowN} :RowProps) => {
    const {outerTile, innerTile} = useStyles();

    return (
        <TableRow component="tr">
        {row.map(({tile}: Tile) => {
            let test = false;

            return (
            tile[rowN].map((n => {
                test = !test;
                return (
                <TableCell align="center" scope="row" className={test ? outerTile : innerTile}>
                    {n}
                </TableCell>
                );
            }
            )));
        })}
        </TableRow>
    );
}

const grid = [
    [createTile(), createTile(), createTile()],
    [createTile(), createTile(), createTile()],
    [createTile(), createTile(), createTile()],
];

const Board: React.FC = () => {
    const {table} = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={table} aria-label="sudoku grid">
                <TableBody>
                    {grid.map((row: Tile[]) =>
                        <Row row={row} rowN={0}/>
                    )}
                    {grid.map((row: Tile[]) =>
                        <Row row={row} rowN={1}/>
                    )}
                    {grid.map((row: Tile[]) =>
                        <Row row={row} rowN={2}/>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Board;