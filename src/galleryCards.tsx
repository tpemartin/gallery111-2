import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GitHubIcon from '@mui/icons-material/GitHub';
import Members from './members';
import { Evaluation } from './evaluation';
import VideoEmbed from './videoEmbed';
import { Link } from '@mui/material';
import { useState } from 'react';
import VideoWithLanguageRadio from "./videoWithLanguageRadio"

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
//['2', Array(6), 'Foreign Student Registration', 'Too less quota, too less registration', 'https://vimeo.com/783259530/846481e041', 'Test', 'https://github.com/tpemartin/111-1-R']
export default function GalleryCard({groupInfo, otherInfo, initExpand=false}) {
  const [groupNumber, groupMembers] = groupInfo
  const [title, subtitle, src, summary, codeHref, srcLanguage, src2, src2Language] = otherInfo
  console.log({groupNumber, groupMembers, title, subtitle, src, summary, codeHref, srcLanguage, src2, src2Language})
  const [expanded, setExpanded] = useState(initExpand);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    
    <Card sx={{ width: 345, marginTop: "10px" }} id={'G'+groupNumber} className="gallery-card">
      <CardHeader sx={{height: 65}}
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {groupNumber}
          </Avatar>
        }
        action={
          <Members members={groupMembers}/>
        }
        title={title}
        subheader={subtitle}
      />
      <VideoWithLanguageRadio src={src} src2={src2} srcLanguage = {srcLanguage} src2Language={src2Language}/>
      {/* <RadioLanguages  srcLanguage = {srcLanguage} src2Language={src2Language}/> */}
      {/* <LanguageButtonGroup srcLanguage = {srcLanguage} src2Language={src2Language}/> */}
      {/* <VideoEmbed src={src}/> */}
      <CardContent sx={{height: 200}}>
        <Typography variant="body2" color="text.secondary">
          {summary}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
      
      <Link href={codeHref}>
        <IconButton aria-label="add to favorites">
          
          <GitHubIcon/>
        </IconButton>
        </Link>
        <ExpandMore
          className="expand-icon"
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Evaluation id={'G'+groupNumber}/>
        </CardContent>
      </Collapse>
    </Card>
    
  );
}