import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles, styled, IconButton, Button, Typography, TextField } from '@material-ui/core';
import { TableCell, TableHead, TableBody, TableContainer, Table, TableRow } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import WorkBenchTopBar from 'components/WorkBenchTopBar';
import { SelectorPresenze, SelectorMese, SelectorAnno, SelectorPasti } from 'components/Selectors';
import StyledTableRow from 'components/StyledTableRow';
import Calendar from 'utils/Calendar';
import { Presenza } from 'model/data.model';

const useStyles = makeStyles(theme => ({
  container: {...theme.workBench, ...theme.container},
  dataButton: { textAlign: "right" }
}));

const CompressedTableCell = styled(TableCell)(() => ({
    padding: '2px 16px'
}));


const PresenzeMese = () => {
  const classes = useStyles();
  const [azienda, setAzienda] = useState('Cociv');
  const [mese, setMese] = useState('Gennaio');
  const [anno, setAnno] = useState('2020');
  const [pasto, setPasto] = useState('Colazione');
  const [presenzeArray, setPresenzeArray] = useState<Presenza[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isTextInputActive, setIsTextInputActive] = useState(false);

  const rows: any = {
    badge: `${azienda} Badge`,
    firma: `${azienda} Firme`,
    totaleAzienda: `TOT ${azienda}`,
    totaleComplessivo: "TOT"
  }

  const getAllMonthDays = (anno: string, mese: string) => {
    const { getAllMonthDays, monthStringToNumber } = Calendar;

    return getAllMonthDays(
      parseInt(anno),
      monthStringToNumber(mese)
    )
  }

  const createWeekDaysCells = (anno: string, mese: string) => {
    return getAllMonthDays(anno, mese).map(day => {
      return(
        <CompressedTableCell key={day} align="right">
          <b>{ day }</b>
        </CompressedTableCell>
      );
    })
  }

  const isSameDay = (presenzaDate: any, monthdaynumber: any) => {
    return new Date(presenzaDate).getDate() === monthdaynumber ? true : false;
  }

  const isSameType = (presenzaType: any, presenzaRow: any) => {
    return presenzaType === presenzaRow ? true : false;
  }

  const isSameAzienda = (presenzaAzienda: any, azienda: any) => {
    return presenzaAzienda === azienda ? true : false;
  }

  const matchPresenze = (allPresenze: any, day: number, selectedAzienda: any, rowType: any) => {
    return allPresenze.filter((presenza: any) => {
      const { data, nome_azienda, type } = presenza;

      switch(rowType) {
        case "badge":
        case "firma":
          return isSameDay(data, day) && isSameAzienda(nome_azienda, selectedAzienda) && isSameType(type, rowType);
        case "totaleAzienda":
          return isSameDay(data, day) && isSameAzienda(nome_azienda, azienda);
        case "totaleComplessivo":
          return isSameDay(data, day);
        default: 
          return;
      }

    })
  }

  const dataConstructor = (allDays: any, allPresenze: any, allRows: any) => {
    return Object.keys(allRows).map((rowType: any) => {
      const columns: any = [];

      for (let dayNumber=1; dayNumber <= allDays.length; dayNumber++) {
        if (allPresenze.length) {
          const matchedPresenze = matchPresenze(allPresenze, dayNumber, azienda, rowType);
          if (matchedPresenze.length) {

            const total = matchedPresenze.reduce((acc: number, presenza: any) => {
              return presenza.numero_presenze + acc;
            }, 0)

            columns.push(
              <CompressedTableCell key={rowType + dayNumber}>
                <Button 
                  onClick={() => setIsTextInputActive(isTextInputActive ? false : true)} 
                  disabled={isEditing ? false : true }
                >
                  <Typography>
                    {
                      isTextInputActive 
                      ? <TextField
                          id="outlined-number"
                          type="number"
                          size="small"
                          margin="none"
                        />
                      : rowType === "badge" || rowType === "firma" ? matchedPresenze[0].numero_presenze : total 
                    }
                  </Typography>
                </Button>
              </CompressedTableCell>
            );
          } else {
            columns.push(
              <CompressedTableCell key={rowType + dayNumber}>
              </CompressedTableCell>
            )
          }
        } else {
          columns.push(
            <CompressedTableCell key={rowType + dayNumber}>
            </CompressedTableCell>
          )
        }
      }

      return(
        <StyledTableRow key={rows[rowType]}>
          <CompressedTableCell>{ rows[rowType] }</CompressedTableCell>
          { columns }
        </StyledTableRow>
      );
    })
  }

  useEffect(() => {

    async function getPresenze() {

      await fetch('http://localhost:3001/presenze')
        .then(response => response.json())
        .then((presenze: Presenza[]) => presenze.filter((presenza: Presenza) => {
          return presenza.nome_pasto === pasto 
          && new Date(presenza.data).getMonth() === Calendar.monthStringToNumber(mese)
          && new Date(presenza.data).getFullYear() === parseInt(anno)
        }))
        .then((filteredPresenze: Presenza[]) => {
          setPresenzeArray(filteredPresenze)
        })
        .catch(e => `Unable to retrive data ${e}` )
        
    }

    getPresenze();

  }, [azienda, pasto, mese, anno]);

  const weekDaysRow = [<TableCell key="empty"></TableCell>, ...createWeekDaysCells(anno, mese)];

  return (
    <Fragment>
      <WorkBenchTopBar>
        <IconButton onClick={() => setIsEditing(isEditing ? false : true)}>
          { isEditing ? <SaveIcon/> : <EditIcon/> }
        </IconButton>
        <SelectorMese setMese={setMese} mese={mese}/>
        <SelectorAnno setAnno={setAnno} anno={anno}/>
        <SelectorPasti setPasto={setPasto} pasto={pasto}/>
        <SelectorPresenze setAzienda={setAzienda} azienda={azienda}/>
      </WorkBenchTopBar>
      <TableContainer className={classes.container}>
        <Table>
          <TableHead>
            <TableRow>{ weekDaysRow }</TableRow>
          </TableHead>
          <TableBody>
            { dataConstructor(getAllMonthDays(anno, mese), presenzeArray, rows) }
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
}

export default PresenzeMese;