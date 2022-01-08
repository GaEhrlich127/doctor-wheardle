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

        marginLeft: '0.25rem',
        marginRight: '0.25rem',
        marginTop: '0.75rem',
        marginBottom: '0.75rem',
        
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: '2px',
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