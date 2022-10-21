import { useEffect, useState } from "react";
import AudioPlayer from "./AudioPlayer";
import SearchBar from "./SearchBar";
import TrackInfo from './TrackInfo.js';
import BangersInfo from './BangersInfo.js';

const Game = ({bangersMode = false}) => {

  const STARTING_DATE = new Date(!bangersMode ? "10/15/2022" : "10/21/2022");
  const CURRENT_DATE = new Date();
  const TIME_DIFF = CURRENT_DATE.getTime()-STARTING_DATE.getTime();
  const DAY_NUMBER = Math.floor(TIME_DIFF/(1000*3600*24));
  const TrackList = !bangersMode ? TrackInfo : BangersInfo;

  const [guesses, setGuesses] = useState([]);

  // If a cookie exists, load the data
  useEffect(()=>{
    const cookie = document.cookie;
    console.log(cookie)
    if(cookie.length!==0) {
      setGuesses(cookie.replaceAll('guesses=','').split('|'));
    }
  },[])

  // Update the cookie when you make a guess
  useEffect(()=>{
    const date = new Date();
    date.setHours(23,59,59,0);
    if(guesses.length!==0){
      let guessStr=''
      for (let i=0;i<guesses.length;i++){
        guessStr+=`${i===0 ? `${guesses[i]}` : `|${guesses[i]}`}`
      }
      document.cookie = `guesses=${guessStr}; expires=${date.toUTCString()}; path=/${!bangersMode ? 'game' : 'bangers'}`;
    }
  },[guesses])

  // Helper function to generate the text from the share button
  const shareText = () => {
    let emoji = ''
    for (let i of guesses){
      if (i==='CORRECT')
        emoji+='🟩'
      if (i==='SKIP')
        emoji+='⬛'
      if (i==='INCORRECT')
        emoji+='🟥'
    }

    return `Doctor Wheardle ${!bangersMode ? '' : `🔥 Bangers Only 🔥`} #${DAY_NUMBER+1} ${guesses.includes('CORRECT') ? guesses.length : 'X'}/6\n${emoji}\n\nhttps://doctor-wheardle.vercel.app/${!bangersMode? '' : 'bangers'}`
  }

  const [shareButtonText, setShareButtonText] = useState('Share');
  useEffect(()=>{
    if(shareButtonText!=='Share'){
      setTimeout(()=>{
        setShareButtonText('Share');
      },5000)
    }
  },[shareButtonText])
  const ShareButton = () => 
    <button
      style={{
        backgroundColor: 'lime',
        border: 'none',
        borderRadius: '5px',
        padding: '5px',
        margin: '5px',
      }}
      onClick={()=>{
        navigator.clipboard.writeText(shareText());
        setShareButtonText('Copied to Clipboard!')
      }}
    >
      {shareButtonText}
    </button>

  return(
    <div
      style={{minWidth:'100vw', minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', backgroundColor:'#2F2F2F', color:'lightgrey', overflowX:'scroll'}}
    >
      <h1>Doctor Wheardle {!bangersMode ? '' : '🔥 Bangers Only 🔥'}</h1>
      <AudioPlayer
        audioSrc={`/${TrackList[DAY_NUMBER]?.path}`}
        currentLimit={guesses.length}
        ignoreBreaks = {guesses.includes('CORRECT') || guesses.length>=6}
      />

      {/* Hold the guess squares here */}
      <div
        style={{
          display:'flex',
          flexDirection:'row',
          justifyContent:'center',
          alignItems:'center',
          width:'100%',
          height:'30px',
        }}
      >
        {guesses.map((guess, index) => {
          return(
            <div
              key={index}
              style={{
                width:'20px',
                height:'20px',
                backgroundColor:
                  guess==='SKIP' ? 'lightgrey' : 
                  guess==='INCORRECT' ? 'red' :
                  guess==='CORRECT' ? 'green' :
                  'transparent',
                margin:'5px',
              }}
            />
          )
        })}
      </div>

      {/* If you haven't won, and still have guesses left, show the search bar */}
      {!guesses.includes('CORRECT') && guesses.length<6 && (
        <SearchBar
          trackInfo={TrackList}
          handleSkip={() => {
            if(guesses.length<6)
            setGuesses([...guesses, 'SKIP'])
          }}
          handleSubmit={(guess) => {
            if(guesses.length<6)
              if(guess!==TrackList[DAY_NUMBER].name){
                setGuesses([...guesses, 'INCORRECT'])
              } else {
                setGuesses([...guesses, 'CORRECT'])
              }
          }}
        />
      )}

      {/* End condition: show the song title and share button */}
      {( guesses.includes('CORRECT') || guesses.length>=6 ) && (
        <div
          style={{
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
          }}
        >
          <p>{`\t${TrackList[DAY_NUMBER].name}`}</p>
          <ShareButton />
        </div>
      )}
    </div>
  )
}

export default Game;