import * as React from 'react';
import Box from '@mui/material/Box';
import { Container, Typography } from '@mui/material';

export default function WarningDialogue({children}) {
  return (
    <Box
      sx={{
        width: '25ch',
        height: 300,
        backgroundColor: 'white'
      }}
      >
        <Container>
            <h3>Be aware</h3>
        <Typography>
          <strong>Save</strong> can be done multiple times.
        </Typography>
        <Typography>
            <strong>Submit</strong> can be done <strong>ONLY ONCE</strong>.
        </Typography>
        </Container>
      </Box>
  );
}