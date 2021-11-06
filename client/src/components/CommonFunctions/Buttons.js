import * as React from 'react';
import {Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Fastfood from '@mui/icons-material/Fastfood';
export function RemoveButton({action})
{
    return(
          <Button variant="contained"
                  color="warning" 
                  startIcon={<DeleteIcon />}
                  onClick={action}
                  >Pašalinti
          </Button>
    )
}
export function EditButton({action}){
    return(
        <Button variant="contained"
                color="primary" 
                onClick={action}
                >Redaguoti</Button>

  )
}
export function AddButton({action, name})
{
    return(
          <Button variant="outlined"
                  color="primary" 
                  onClick={action}
                  startIcon={<AddIcon />}
                  >{name}
          </Button>
    )
}
export function AddFoodButton({action})
{
    return(
          <Button variant="contained"
                  color="secondary" 
                  onClick={action}
                  startIcon={<Fastfood />}
                  >Maistas į kambarį
          </Button>
    )
}