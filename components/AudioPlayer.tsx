import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay, faCirclePause } from "@fortawesome/free-solid-svg-icons";

const AudioPlayer = ({ imgSrc, audioSrc, currentLimit }) => {
  const [status, setStatus] = useState({
    isPlaying: false,
    isLoop: false,
    isLoaded: false,
    error: false,
  });
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const BREAKPOINTS = [1, 2, 4, 7, 11, 16]

  // Handler to keep current time updated
  useEffect(() => {
    audioRef.current.addEventListener('timeupdate', () => {
      setCurrentTime(audioRef.current.currentTime);
    });
  }, []);

  // Check current time, if it's at or above the limit, reset
  useEffect(() => {
    if(currentTime>=BREAKPOINTS[currentLimit]) {
      audioRef.current.pause();
      audioRef.current.currentTime=0
    }
  }, [currentTime]);

  const toggleAudio = () =>
    status.isLoaded
      ? status.isPlaying
        ? audioRef.current.pause()
        : audioRef.current.play()
      : console.log("Audio has not loaded yet.", status);

  const WIDTH_PER_SECOND=28;
  return (
    <>
      <p>Current Time: {currentTime}</p>
      {!status.isLoaded && <p>Loading...</p>}
      <div>
        <div style={{
          width: `${16.15*WIDTH_PER_SECOND}px`,
          height: '20px',
          border: '2px solid lightgrey',
        }}>
          <div style={{
            height: '100%',
            width: `${currentTime*28}px`,
            backgroundColor: '#0a4c8b',
          }} />
        </div>      
        <div style={{
          width: `${16.15*WIDTH_PER_SECOND}px`,
          height: '20px',
          border: '2px solid lightgrey',
          position: 'absolute',
          marginTop:'-20px'
        }}>
          {BREAKPOINTS.slice(0,-1).map((breakpoint, index) => (
            <div
              key={index}
              style={{
                height: '100%',
                width: '1px',
                backgroundColor: 'lightgray',
                position: 'absolute',
                left: `${breakpoint*WIDTH_PER_SECOND}px`,
              }}
            />
          ))}
        </div>
      </div>

      <div style={{cursor: 'pointer'}} onClick={toggleAudio}>
        {status.isPlaying ? 
          <FontAwesomeIcon icon={faCirclePause} fontSize="50" color='white' /> :
          <FontAwesomeIcon icon={faCirclePlay} fontSize="50" color='white' />
        }
      </div>
      <audio
        ref={audioRef}
        src={audioSrc}
        onLoadedData={() => setStatus({ ...status, isLoaded: true })}
        onPlay={() => setStatus({ ...status, isPlaying: true })}
        onPause={() => setStatus({ ...status, isPlaying: false })}
        onError={() => setStatus({ ...status, error: true })}
      />
      <button onClick={()=>{audioRef.current.pause();audioRef.current.currentTime=0}}>
        Reset
      </button>
    </>
  );
};

export default AudioPlayer;