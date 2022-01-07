interface LetterProps {
  character: string;
  color: string;
}

const Letter = (props:LetterProps) => {

  return(
    <div
      style={{
        width: '5rem',
        height: '5rem',
        
        backgroundColor: props.color,
        color: props.color === 'white' ? 'black': 'white',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        fontFamily: 'helvetica',
        fontSize:'1.5rem'
      }}
    >
      {props.character}
    </div>
  )

}

export default Letter;