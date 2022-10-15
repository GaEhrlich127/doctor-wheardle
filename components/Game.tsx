import { useEffect, useState } from "react";
import AudioPlayer from "./AudioPlayer";
import * as musicMetadata from 'music-metadata-browser';
const Game = () => {

  const STARTING_DATE = new Date("10/14/2022");
  const CURRENT_DATE = new Date();
  const TIME_DIFF = CURRENT_DATE.getTime()-STARTING_DATE.getTime();
  const DAY_NUMBER = Math.floor(TIME_DIFF/(1000*3600*24));

  const [file, setFile] = useState();
  // useEffect(()=>{
  //   if(typeof musicMetadata !== 'undefined'){
  //     musicMetadata.parseBlob(file).then(metadata => {
  //       console.log(metadata)
  //     });
  //   }
  // },[file])

  return(
    <div
      style={{width:'100vw', height:'100vh', display:'flex', flexDirection:'column', alignItems:'center', backgroundColor:'black', color:'lightgrey'}}
    >
      <input type='file' onChange={(e)=>{setFile(e.target.files[0])}}/>
      <AudioPlayer
        audioSrc={"/Donna's Theme.mp3"}
        imgSrc={"/icon.png"}
        currentLimit={3}
      />
    </div>
  )
}

export default Game;