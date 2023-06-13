import * as React from 'react';
import Box from '@mui/material/Box';
import Rate from './rating.tsx';
import { Divider, Typography } from '@mui/material';


export function Evaluation({id}){
    return <Box>
    
    <Rate title={"作品得分"} id={id}/>
    

    </Box>
}