import * as React from 'react';
import { useDemoData } from '@mui/x-data-grid-generator';
import { autocompleteClasses, Button } from '@mui/material';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green, orange } from '@mui/material/colors';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

const outerTheme = createTheme({
    palette: {
      secondary: {
        main: orange[500],
      },
    },
  });

export default function Workers() {
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 10,
    maxColumns: 6,
  });


  function RemoveButton(values)
  {
      return(
        <Box>
            <Button theme={outerTheme} variant="contained"
                    color="primary" 
                    onClick={()=>{console.log(values)}}>Šalinti</Button>
        </Box>
      )
  }
  function EditButton(values)
  {
      return(
        <Box>
            <Button variant="contained"
                    color="primary" 
                    onClick={()=>{console.log(values)}}>Redaguoti</Button>
        </Box>
      )
  }

  const rows: GridRowsProp = [
    { id: 1, vardas: 'Hello', pavarde: 'World' },
    { id: 2, vardas: 'DataGridPro', pavarde: 'is Awesome' },
    { id: 3, vardas: 'MUI', pavarde: 'is Amazing' },
  ];
  
  const columns: GridColDef[] = [
    { field: 'vardas', headerName: 'Vardas', width: 150 },
    { field: 'pavarde', headerName: 'Pavarde', width: 150 },
    { field: 'Šalinimas', headerName: 'Šalinimas', editable:false, width: 150, renderCell:(cellValues)=>{return RemoveButton(cellValues) } },
    { field: 'Redagavimas', headerName: 'Redagavimas', editable:false, width: 200, renderCell:(cellValues)=>{return EditButton(cellValues) } },
  ];


  return (
    <Box theme={outerTheme} sx={{
        width: 1000,
        height: 500}}>
      <DataGrid autoHeight
                hideFooter 
                hideFooterRowCount 
                hideFooterSelectedRowCount 
                hideFooterPagination 
                rows={rows} 
                columns={columns} />
      <Button   color="primary"
                variant="contained">
                TESTT
          </Button>
    </Box>
  );
}