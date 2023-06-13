import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import VideoEmbed from './videoEmbed';

export default function VideoWithLanguageRadio({src, srcLanguage, src2, src2Language}) {
  const [value, setValue] = React.useState(srcLanguage);

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  
  var validSrc = (value === srcLanguage)?src:src2
  
  var radioSecondLanguage = (src2!=="" && src2Language!==""?
    <FormControlLabel value={src2Language} control={<Radio />} label={src2Language} />:
    <></>)
  return (
    <div>
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">Language</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value={srcLanguage} control={<Radio />} label={srcLanguage} />
        {radioSecondLanguage}
      </RadioGroup>
    </FormControl>
    <VideoEmbed src={validSrc}/>
    </div>
  );
}