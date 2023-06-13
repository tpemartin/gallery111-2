import { CardMedia } from "@mui/material"

export default function VideoEmbed({src}){
    const flag_vimeo = /vimeo/.test(src)
    //https://vimeo.com/783259530/846481e041
    //src: <iframe src="https://player.vimeo.com/video/783259530?h=846481e041" width="640" height="564" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>

    var videoId, cardMedia
    if(flag_vimeo) {
        videoId = src.match(/com\/.+/)[0].replace(/com\//,"").replace(/\//,"?h=")
        const iframeSrc =`https://player.vimeo.com/video/${videoId}`
        cardMedia = <CardMedia
            component="iframe"
            src = {iframeSrc}
            frameBorder="0" allow="autoplay; fullscreen; picture-in-picture"  />
    } else {
        videoId = src.match(/be\/[^/]+/)[0].replace(/be\//,"")
        const iframeSrc = `https://www.youtube.com/embed/${videoId}`
        cardMedia = <CardMedia
            component="iframe"
            src= {iframeSrc}
            frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"/>
    }

    //https://youtu.be/AnmfP5FTPbA
    //src: <iframe width="560" height="315" src="https://www.youtube.com/embed/AnmfP5FTPbA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   return <>{cardMedia}</>
}
