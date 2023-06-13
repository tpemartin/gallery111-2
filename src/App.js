import './App.css';
import GalleryCard from './galleryCards.tsx';
import Grid from '@mui/material/Unstable_Grid2';
import VideoEmbed from './videoEmbed';
import { useFetch } from 'usehooks-ts';
import { ContactPageSharp } from '@mui/icons-material';
import NavBar from './navbar';
import appconfig from "./appconfig.json";
import ReactGA from 'react-ga';
import RetrieveMemberInProgress from './components/InProgress';
import { useEffect, useState } from 'react';
import axios from 'axios';
const TRACKING_ID = "UA-104915016-12"; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);
// const user = {
//   "iss": "https://accounts.google.com",
//   "nbf": 1672358521,
//   "aud": "235254569809-gj9m2e1856kh01i0gcbb8lnf0vnnu9a2.apps.googleusercontent.com",
//   "sub": "116342314016783101704",
//   "email": "s411173100@gm.ntpu.edu.tw",
//   "email_verified": true,
//   "azp": "235254569809-gj9m2e1856kh01i0gcbb8lnf0vnnu9a2.apps.googleusercontent.com",
//   "name": "Martin Lin",
//   "picture": "https://lh3.googleusercontent.com/a/AEdFTp7Gte6rjLTN7RDe6y8brBquCwwOvVAkDLfAbgd-jg=s96-c",
//   "given_name": "Martin",
//   "family_name": "Lin",
//   "iat": 1672358821,
//   "exp": 1672362421,
//   "jti": "a539d81739f8e19294b745e7f8c4e2b93e1811af"
// }

function App() {
  const appscriptUrl = appconfig.appscriptUrl;

  const [data, setData] = useState(null)
  useEffect(() => {
    axios.get(appscriptUrl).then((res) => {
      console.log(res.data)
      setData(res.data)
    })
  }, [])
  
  var gallery = data ? <Gallery data={data} /> : <div>Loading...</div> 
  

  return (
    <div className="App">
      <NavBar />
      <Grid container spacing={2}>
        <Grid sx={{ justifyContent: "space-around" }} md={8} mdOffset={2} xs={10} xsOffset={1} className="gallery-grid">
          {
            gallery
          }
        </Grid>
      </Grid>

    </div>
  );
}
function Gallery({data}){
  const { userGroup, projectsData } = data
  
  
  //console.log(data)
  //console.log(convertDataArrayToDataObject(data))

  const dataObject = convertDataArrayToDataObject(projectsData)
  console.log(dataObject)
  var projects = dataObject.map(
    (e,i) => convertToGalleryCardData(e,i))// dataObject.map(convertToGalleryCardData) //.pop()
  // projects = dataObject.map(convertToGalleryCardData)
  projects.shift()
  
  // gallery = projects.map((e,i)=> <GalleryCard {...[...e.groupInfo, ...e.otherInfo]} key={i} />)
  var gallery = projects.map((e, i) => <GalleryCard key={i} groupInfo={e.groupInfo} otherInfo={e.otherInfo} />)

  // window.cards = document.getElementsByClassName("gallery-card")
  return (
    <>
      {gallery}
    </>
  )
}
function convertToGalleryCardData(e, i) {
  // console.log('this is  e',e)
  // var splitArray = e['Group'].replace(" (","-(")
  // console.log(splitArray)
  // console.log(e['Group'].replaceAll(/ \(/g,"-(").split("-"))
  // If e['Group'] does not start with a number
  // console.log('e', e)
  // var flagStartWithGroup = /^[0-9]/.test(e['Group'])
  // console.log(flagStartWithGroup)
  // var groupNumber, groupMembers;

  // if (flagStartWithGroup) {
  //   var splitArray = e['Group'].replaceAll(/ \(/g, "-(").split("-");
  //  var groupNumber = splitArray.splice(0, 1)[0]
  //   var groupMembers = splitArray
  // } else {
  //   var [groupNumber, groupMembers] = e['Group'].split(" - ")
  // }
  if(i){
    var groupNumber = i
    var groupMembers = e['Group']
  } else {
    var splitArray = e['Group'].replaceAll(/ \(/g, "-(").split("-");
    var groupNumber = splitArray.splice(0, 1)[0]
    var groupMembers = splitArray
  }
  const groupInfo = [groupNumber, groupMembers]
  // const otherInfoNames = ['title', 'subtitle', 'src', 'summary', 'codeHref']
  const otherInfoNames = ['title', 'subtitle', 'src', 'summary', 'codeHref', 'srcLanguage', 'src2', 'src2Language']
  const otherInfo = otherInfoNames.map(x => e[x])
  return { groupInfo: groupInfo, otherInfo: otherInfo }
}
function renameForGalleryCardKeys(dataObject) {
  const e = dataObject[1]


}
function renameKeys(o, new_key, old_key) {
  if (old_key !== new_key) {
    Object.defineProperty(o, new_key,
      Object.getOwnPropertyDescriptor(o, old_key));
    delete o[old_key];
  }

}
function convertDataArrayToDataObject(data) {
  return data.map(e => objectfyArray(e, data[0]))
}
function objectfyArray(e, e0) {
  var obj = { ...e }
  e.forEach((v, i) => renameKeys(obj, e0[i], i))
  const nNames = ['title', 'subtitle', 'src', 'summary', 'codeHref', 'srcLanguage', 'src2', 'src2Language']
  const oNames = ['Title', 'Subtitle (optional)', 'Video link', 'Summary', 'Github code link', "Video link's language", "Video link 2", "Video link 2's language"]
  nNames.forEach((v, i) => renameKeys(obj, v, oNames[i]))
  return obj
}
export default App;
