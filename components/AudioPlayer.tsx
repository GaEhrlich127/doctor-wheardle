import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay, faCirclePause, faSpinner } from "@fortawesome/free-solid-svg-icons";
import NonSSRWrapper from './NonSSRWrapper';

const AudioPlayer = ({ audioSrc, currentLimit, ignoreBreaks, audioRef }) => {
  const [status, setStatus] = useState({
    isPlaying: false,
    isLoop: false,
    isLoaded: false,
    error: false,
  });
  const [currentTime, setCurrentTime] = useState(0);
  const BREAKPOINTS = [1, 2, 4, 7, 11, 16]
  const [innerWidth, setInnerWidth] = useState(0);

  useEffect(()=>{
    setInnerWidth(window.innerWidth);
  },[])

  // Handler to keep current time updated
  useEffect(() => {
    if(status.isLoaded)
      audioRef?.current.addEventListener('timeupdate', () => {
        setCurrentTime(audioRef.current.currentTime);
      });
  }, [status.isLoaded]);

  // Check current time, if it's at or above the limit, reset
  // Optionally, if breaks are being ignored, keep playing
  useEffect(() => {
    if(currentTime>=BREAKPOINTS[currentLimit] && !ignoreBreaks) {
      audioRef.current.pause();
      audioRef.current.currentTime=0
    }
  }, [currentTime]);

  const toggleAudio = () =>
    status.isLoaded
      ? status.isPlaying
        ? audioRef.current.pause()
        : audioRef.current.play()
      : '';

  // Convert a number of seconds to a correct MM:SS format
  const timeConverter = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  }

  const TOTAL_WIDTH_VW=56.525;
  const TOTAL_WIDTH_PX = `${TOTAL_WIDTH_VW} * ${innerWidth / 100}`;
  const TOTAL_TIME = ignoreBreaks ? audioRef.current?.duration : 16;
  const WIDTH_PER_SECOND=TOTAL_WIDTH_VW/TOTAL_TIME;
  return (
    <NonSSRWrapper>
      {/* Show a loading spinner while it loads */}
      {!status.isLoaded && 
        <FontAwesomeIcon style={{marginBottom:'10px', marginTop:'10px'}} icon={faSpinner} fontSize="40" color='white' spin />
      }
      
      {/* Once it has loaded, show the pause/play button */}
      {status.isLoaded && (
        <div style={{cursor: 'pointer', marginBottom:'10px', marginTop:'10px'}} onClick={toggleAudio}>
          {status.isPlaying ? 
            <FontAwesomeIcon icon={faCirclePause} fontSize="40" color='white' /> :
            <FontAwesomeIcon icon={faCirclePlay} fontSize="40" color='white' />
          }
        </div>
      )}
      
      {/* Progress Bar */}
      <div>
        {/* A div that will slowly fill */}
        <div style={{
          width: `${TOTAL_WIDTH_PX}px`,
          height: '20px',
          border: '2px solid lightgrey',
        }}>
          {/* The div that fills it */}
          <div style={{
            height: '100%',
            width: `${currentTime*WIDTH_PER_SECOND}vw`,
            maxWidth: `${TOTAL_WIDTH_VW-.38}vw`,
            backgroundColor: '#0a4c8b',
          }} />
        </div>
        {/* Another div, overlayed ontop of the others, that has the vertical lines for the breakpoints */}
        {!ignoreBreaks && (
          <div style={{
            width: `${TOTAL_WIDTH_PX+1}px`,
            height: '20px',
            border: '2px solid lightgrey',
            position: 'absolute',
            marginTop:'-20px'
          }}>
            {/* Generates the vertical lines */}
            {BREAKPOINTS.slice(0,-1).map((breakpoint, index) => (
              <div
                key={index}
                style={{
                  height: '100%',
                  width: '1px',
                  backgroundColor: 'lightgray',
                  position: 'absolute',
                  left: `${breakpoint*WIDTH_PER_SECOND}vw`,
                }}
              />
            ))}
          </div>
        )}

        {/* Show the timers */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: `${TOTAL_WIDTH_VW-.05}vw`,
          marginTop: '5px',
        }}>
          <p style={{color: 'lightgrey', fontSize: '12px'}}>{timeConverter(audioRef.current?.currentTime)}</p>
          <p style={{color: 'lightgrey', fontSize: '12px'}}>{ignoreBreaks ? timeConverter(audioRef.current?.duration) : '0:16'}</p>
        </div>
      </div>

      {/* Audio player */}
      <audio
        ref={audioRef}
        src={audioSrc}
        onLoadedData={() => setStatus({ ...status, isLoaded: true }) }
        onPlay={() => setStatus({ ...status, isPlaying: true })}
        onPause={() => setStatus({ ...status, isPlaying: false })}
        onError={() => setStatus({ ...status, error: true })}
      />
    </NonSSRWrapper>
  );
};

export default AudioPlayer;