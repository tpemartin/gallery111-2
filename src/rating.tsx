import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { Button, Divider, IconButton } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { Stack } from '@mui/system';
import { useState } from 'react';
export default function Rate({title, id, disabled}) {
  const isDisabled = disabled?true:false;
  const value0 = sessionStorage[id]?Number(sessionStorage[id]):0
  const [value, setValue] = useState<number | null>(value0);
  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      
      <Typography component="legend" sx={{opacity: isDisabled?0.3:1}}>{title}</Typography>
      <Stack direction="row" sx={{justifyContent: "center", alignItems: "center"}}>
      <IconButton onClick={()=>{
        setValue(0)
        sessionStorage.setItem(id, ''+0)
        }} disabled={isDisabled}><RestoreIcon/></IconButton>
     
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          sessionStorage.setItem(id, ''+newValue)
        }}
        disabled={isDisabled}
      />
       </Stack>
    </Box>
  );
}