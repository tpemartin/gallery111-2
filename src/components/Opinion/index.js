import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Opinion() {
  const value_init = sessionStorage['feedback']
  var [value, setValue] = React.useState(value_init?value_init:null)

  console.log(sessionStorage)
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
        <TextField
          id="feedback"
          label="Feedback"
          multiline
          rows={4}
          defaultValue={value}
          onChange={(e)=>{
            sessionStorage["feedback"] = e.target.value
            //console.log(sessionStorage)
        }}
        />
      
      
    </Box>
  );
}