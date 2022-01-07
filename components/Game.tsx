import Letter from "./Letter";
import { useEffect, useState } from "react";

const Game = () => {

  const [completedGuesses, setCompletedGuesses] = useState([]);
  const [guess, setGuess] = useState('');

  const submitGuess = () => {
    if(completedGuesses.length<6){
      setCompletedGuesses([...completedGuesses, guess]);
    }
  }

  const handleKeyPress = (event) => {
    if(event.key === 'Backspace') {
      setGuess(guess.slice(0, -1));
    } else if(event.key === 'Enter' && guess.length === 5 && guess.length > 0) {
      submitGuess()
    } else if(event.keyCode >= 65 && event.keyCode <= 90 && guess.length < 5) {
      setGuess(guess+event.key);
    }
  }

  return(
    <div
      tabIndex={0}
      onKeyDown={ (event) => { handleKeyPress(event) } }
      style={{width:'100vw', height:'100vh', display:'flex', flexDirection:'column', alignItems:'center', borderColor:'green', borderStyle:'solid', borderWidth:'1px'}}
    >
      <div style={{
        display:'flex',
        flexDirection:'column',
      }}>
        {completedGuesses.map((guessed, index) => {
          return (
            <div 
              key={`word-${index}`}
              style={{
                display:'flex',
                flexDirection:'row'
              }}
            >
              {guessed.split('').map((letter, letterIndex) => {
                return (
                  <Letter
                    key={`letter-${letterIndex}`}
                    character={letter} 
                    color={
                      //rightSpot ? 'green' :
                      //wrongSpot ? 'yellow' :
                      //notPresent ? 'lightgray' :
                      index === 0 ? 'red' :
                      index === 1 ? 'orange' :
                      index === 2 ? 'white' :
                      index === 3 ? 'green' :
                      index === 4 ? 'blue' :
                      'black'
                    }
                  />
                )
              })}
            </div>
          )
        })}
      </div>
      <div style={{
        display:'flex',
        flexDirection:'row',
      }}>
        {(guess.length<5?guess+("-".repeat(5-guess.length)):guess).split('').map((letter, index) => {
          return (
            <Letter
              key={`letter-${index}`}
              character={letter} 
              color={
                index === 0 ? 'red' :
                index === 1 ? 'orange' :
                index === 2 ? 'white' :
                index === 3 ? 'green' :
                index === 4 ? 'blue' :
                'black'
              }
            />
          )
        })} 
      </div>
    </div>
  )
}

      {/* <button onClick={()=>{
        const docRef = doc(firestore, "test", "test");
        getDoc(docRef).then((docSnap)=>{
          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        });

      }}>
        click me!
      </button> */}

export default Game;