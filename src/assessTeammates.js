import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Avatar, Container, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FormAssessTeammate from './formAssessTeammates';
import { useFetch } from 'usehooks-ts';
import appconfig from "./appconfig.json"
import RetrieveMemberInProgress from './components/InProgress';
import ErrorNotMember from './components/ErrorNotMember';

export default function BasicDrawer({anchor, Icon, group, email, groupNumber, alreadySubmit,url, children}) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  // https://www.developerway.com/posts/react-component-as-prop-the-right-way

  return (
    <div>
     
        <React.Fragment key={anchor}>
          <Icon onClick={toggleDrawer(anchor, true)}/>
        {/* <Button onClick={toggleDrawer(anchor, true)}><Icon/></Button> */}
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {/* <Profile/> */}
            <FormAssessTeammate url={url} email={email} group={group} groupNumber={groupNumber} alreadySubmit={alreadySubmit}>
              {children}  
            </FormAssessTeammate>
            {/* {list(anchor)} */}
          </Drawer>
        </React.Fragment>
     
    </div>
  );
}

export function ButtonNavBarMenuIcon({onClick}){
  return <IconButton
  size="large"
  edge="start"
  color="inherit"
  aria-label="menu"
  sx={{ mr: 2 }}
  onClick = {onClick}
>
  <MenuIcon sx={{color: "white"}}/>
</IconButton>
}

export function AssessTeammates({user, url}){
  console.log("AssTeammates")
  console.log(user)
  const picture = user.picture;
  const name = user.name;
  const email = user.email;
  const appscriptUrl = appconfig.appscriptUrl;
  const {data, error} = useFetch(appscriptUrl+`?email=${email}`)
  if (error) return <ErrorNotMember/> // <p>There is an error.</p>
  if (!data) return <RetrieveMemberInProgress open={true}/>
  
  //var [groupNumber, setGroupNumber] = useState(null)
  
  if(data){
    console.log(data)
    var {userGroup, projectsData, storage, submit} = data
    var {user, groupInfo} = userGroup
    //console.log('groupInfo is', groupInfo)
    
     //console.log(groupNumber?"has g"+groupNumber:"no groupnumber")
    console.log('submit is ', submit)
    const objStorage = JSON.parse(storage)
    sessionStorage.clear()
    Object.keys(objStorage).forEach((key)=>{sessionStorage[key]=objStorage[key]})
    
    const groupNumber = groupInfo?groupInfo.match(/^[0-9]+/g)[0]:""

    // if(groupInfo){
    //    const groupNumber = groupInfo.match(/^[0-9]+/g)[0]
    //    window.cards['G'+groupNumber].querySelector(".expand-icon").remove()
    // }
    
   
    return <BasicDrawer anchor={"left"} Icon={ButtonNavBarMenuIcon} 
    email = {email}
    group = {userGroup} user={user} url={url} groupNumber={groupNumber} alreadySubmit={(submit!==-1)?true:false}>
       <Container sx={{paddingTop: 2}}>
            <Avatar alt={name} src={picture} />
        </Container>
    </BasicDrawer>
  } 
} 
