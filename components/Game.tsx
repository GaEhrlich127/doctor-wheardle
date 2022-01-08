import Letter from "./Letter";
import { useEffect, useState } from "react";
const Game = () => {

  interface guessInfo{
    word:string;
    colors:Array<string>;
  }
  const [completedGuesses, setCompletedGuesses] = useState<Array<guessInfo>>([]);
  const [guess, setGuess] = useState('');
  const [targetId, setTargetId] = useState<number>();
  const dictionary = require('../dict.json');

  useEffect(()=>{
    setTargetId(7663);
  },[])

  const submitGuess = () => {
    if(completedGuesses.length<6){
      let colors=[]
      for (let index=0; index<guess.length; index++) {
        const letter = guess[index];
        //If the letter matches
        if( dictionary[targetId][index] === letter ){ colors.push('green'); continue; }
        //If the letter is not present
        else if ( dictionary[targetId].indexOf(letter) === -1 ){ colors.push('gray'); continue; }
        //If the letter is present but not in the correct position
        else{
          let targetLetterCount=0;
          for(const character of dictionary[targetId]){
            if(character === letter){ targetLetterCount++; }
          }
          for(let i=0; i<colors.length; i++){
            if( ( colors[i]==='green' || colors[i]==='GoldenRod' ) && guess[i] === letter){
              targetLetterCount--;
            }
          }
          console.log(letter, targetLetterCount);
          if(targetLetterCount>0) { colors.push('GoldenRod'); continue; }
          else{ colors.push('gray'); continue; }
        }
      }

      console.log('here2')
      setCompletedGuesses([...completedGuesses, {word:guess, colors}]);
      setGuess('')
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
              {guessed.word.split('').map((letter, letterIndex) => {
                return (
                  <Letter
                    key={`letter-${letterIndex}`}
                    character={letter} 
                    color={guessed.colors[letterIndex]}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
      {completedGuesses.length<6 && (<div style={{
        display:'flex',
        flexDirection:'row',
      }}>
        {(guess.length<5?guess+("-".repeat(5-guess.length)):guess).split('').map((letter, index) => {
          return (
            <Letter
              key={`letter-${index}`}
              character={letter} 
              color='white'
            />
          )
        })} 
      </div>)}
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