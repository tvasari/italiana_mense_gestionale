import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import HeaderMagazzino from './HeaderMagazzino';
import SortingTableHeader from 'components/SortingTable/SortingTableHeader';
import SortingTableBody from 'components/SortingTable/SortingTableBody';

const useStyles = makeStyles(theme => ({
    container: theme.container,
}));

const colNames = ["Ortofrutta", "UM", "Quantità", "Costo/UM", "Tot."].map((colName, i) => {
    return <Typography variant='body1' key={colName} color='primary'><b>{colName}</b></Typography>
});

const stockItems = [
    "Uova",
    "Latte",
    "Olio",
    "Uva",
    "Uova",
    "Latte",
    "Olio",
    "Uva",
    "Uova",
    "Latte",
    "Olio",
    "Uva",
    "Uova",
    "Latte",
    "Olio",
    "Uva",
    "Uova",
    "Latte",
    "Olio",
    "Uva",
    "Uova",
    "Latte",
    "Olio",
    "Uva",
    "Uova",
    "Latte",
    "Olio",
    "Uva",
    "Uova",
    "Latte",
    "Olio",
    "Uva",
]

const Magazzino = () => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.container}>
        <SortingTableHeader headerElem={<HeaderMagazzino />} />
        <SortingTableBody colNames={colNames} rowsArray={stockItems}/>
        <SortingTableBody colNames={colNames} rowsArray={stockItems}/>
    </TableContainer>
  );
}

export default Magazzino;