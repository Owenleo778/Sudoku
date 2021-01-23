import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Table, TableBody, TableCell, TableContainer, TableRow } from "@material-ui/core";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    innerTile: {
        border: "2px solid gray",
    },
    outerLeft: {
        borderLeft: "5px solid black",
    },
    outerRight: {
        borderRight: "5px solid black",
    },
    outerUp: {
        borderTop: "5px solid black",
    },
    outerDown: {
        borderBottom: "5px solid black",
    },
});

type Tile = {
    tile: number[][];
}

function createTile(n: number): Tile {
    return { tile: [[n,n,n], [n+1,n+1,n+1], [n+2,n+2,n+2]]};
}

interface RowProps {
    row: Tile[];
    rowN: number;
}

interface CellProps {
    value: number;
    row: number;
    column: number;
}

function applyStyle(n: number, style1: string, style2: string): string {
    let out = "";
    switch(n){
        case 0: {
            out = style1;
            break;
        }
        case 2: {
            out = style2;
            break;
        }
    }
    return out;
}

const Cell: React.FC<CellProps> = ({value, row, column}: CellProps) => {
    const {innerTile, outerLeft, outerRight, outerUp, outerDown} = useStyles();
    let classes = innerTile;

    classes+= ` ${applyStyle(row, outerUp, outerDown)}`;
    classes+= ` ${applyStyle(column, outerLeft, outerRight)}`;

    return (
        <TableCell align="center" scope="row" className={classes}>
            {value}
        </TableCell>
    );
}

const Row: React.FC<RowProps> = ({row, rowN} :RowProps) => {
    return (
        <TableRow component="tr">
        {row.map(({tile}: Tile) => {
            let column = -1;
            return (
            tile[rowN].map((n => {
                column++;
                return (
                <Cell value={n} column={column} row={rowN} />
                );
            }
            )));
        })}
        </TableRow>
    );
}

const grid = [
    [createTile(1), createTile(1), createTile(1)],
    [createTile(4), createTile(4), createTile(4)],
    [createTile(7), createTile(7), createTile(7)],
];

const Board: React.FC = () => {
    const {table} = useStyles();
    return (
        <TableContainer component={Paper}>
            <Table className={table} aria-label="sudoku grid">
                <TableBody>
                    {grid.map((row: Tile[]) =>
                        <>
                            <Row row={row} rowN={0}/>
                            <Row row={row} rowN={1}/>
                            <Row row={row} rowN={2}/>
                        </>
                    )}

                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Board;