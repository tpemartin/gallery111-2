import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { AssessTeammates } from './assessTeammates';
// import { SignIn } from '@tpemartin/react-google-oauth';
import jwtDecode from 'jwt-decode';
import { Avatar, Button } from '@mui/material';
import { Stack } from '@mui/system';
import appconfig from "./appconfig.json";

const user = {
  "iss": "https://accounts.google.com",
  "nbf": 1672358521,
  "aud": "235254569809-gj9m2e1856kh01i0gcbb8lnf0vnnu9a2.apps.googleusercontent.com",
  "sub": "116342314016783101704",
  "email": "s411173100@gm.ntpu.edu.tw",
  "email_verified": true,
  "azp": "235254569809-gj9m2e1856kh01i0gcbb8lnf0vnnu9a2.apps.googleusercontent.com",
  "name": "Martin Lin",
  "picture": "https://lh3.googleusercontent.com/a/AEdFTp7Gte6rjLTN7RDe6y8brBquCwwOvVAkDLfAbgd-jg=s96-c",
  "given_name": "Martin",
  "family_name": "Lin",
  "iat": 1672358821,
  "exp": 1672362421,
  "jti": "a539d81739f8e19294b745e7f8c4e2b93e1811af"
}

export default function NavBar() {

 


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Programming for Data Science -- Final Project Gallery
          </Typography>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}


function BtnSignOut({user, signOut}){
  return <Stack direction="row" spacing={2}>
    <Avatar alt={user.email} src={user.picture} />
    <Button variant='contained' onClick={signOut()} >Log out</Button>
  </Stack>
  
}
