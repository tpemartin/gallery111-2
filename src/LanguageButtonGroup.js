import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function LanguageButtonGroup({srcLanguage, src2Language}) {
  console.log(srcLanguage)
  console.log(src2Language)
    var btn1 = <Button>{srcLanguage==="English"?"EN":"中文"}</Button>
    var btn2 = <></>
    if(src2Language!==""){
        btn2 = <Button disabled={true}>{src2Language==="English"?"EN":"中文"}</Button>
    }
  return (
    <ButtonGroup sx={{marginBottom: "10px"}} variant="contained" aria-label="outlined primary button group">
      {btn1}
      {btn2}
    </ButtonGroup>
  );
}