import * as React from 'react';
import ButtonUnstyled, { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';
import { Box } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const blue = {
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
};

const grey = {
  100: '#eaeef2',
  300: '#afb8c1',
  900: '#24292f',
};

const CustomButton = styled(ButtonUnstyled)(
  ({ theme }) => `
  font-family: IBM Plex Sans, sans-serif;
  font-weight: bold;
  font-size: 0.875rem;
  background-color: ${blue[500]};
  padding: 12px 24px;
  border-radius: 12px;
  color: white;
  width: 90px;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;
  box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[100]};

  &:hover {
    background-color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.active} {
    background-color: ${blue[700]};
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 3px 20px 0 rgba(61, 71, 82, 0.1), 0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
  `,
);

export default function SaveButton({disabled, url, email}){
    
    //const urlFinal =url +`?email=${email}&storage=${JSON.stringify(sessionStorage)}`
    var [isOpen, setIsOpen] = React.useState(false)
    var [responseContent, setResponseContent] = React.useState({
      type: "success", title: "Saving successful", text: "The scores are saved, but not submitted. Don't forget to submit scores when finishing evaluation."})
    var [responseOpen, setResponseOpen] = React.useState(false)
    return (
        <Box
            sx={{
                '& > legend': { mt: 2 },
            }}
        >
            <CustomButton disabled={disabled} 
            onClick={()=>{
              setIsOpen(true)
              console.log({email: email, storage: sessionStorage})
              const fetchOption = postOption({email: email, storage: sessionStorage})

              fetch(url+'?purpose=save', fetchOption)
                .then(res=>{
                  
                  console.log(res.status)
                  setIsOpen(false)
                  setResponseOpen(true)

                })
              

            }}>Save</CustomButton>
            <SaveInProgress open={isOpen}/>
            {responseOpen?(<ResponseDialogue content={responseContent}/>):<></>}
        </Box>)
}

function SaveInProgress({open}) {
  
  return (
    
      <Backdrop
        open = {open}
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    
  );
}

function postOption(data){
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "text/plain; charset=utf-8");

  const raw = JSON.stringify(data);
   
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw
  };
  return (requestOptions)
}
function ResponseDialogue({content}) {
  const [open, setOpen] = React.useState(true);
  const {type, title, text} = content

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
