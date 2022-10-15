import {useEffect, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch, faTimes} from '@fortawesome/free-solid-svg-icons';
import Fuse from 'fuse.js'

const SearchBar = ({trackInfo, handleSubmit, handleSkip}) => {
  const songList = trackInfo

  const [searchTerm, setSearchTerm] = useState('');
  const [currentlySearching, setCurrentlySearching] = useState(true);

  interface SearchResults{
    item: {
      name: string;
      path: string;
    }
  }

  // Fuse.js dependency to fuzzy search, and not need to use includes, or make my own solution
  const fuse = new Fuse(songList, {
    keys: ['name'],
    includeScore: false,
  })

  // selfHandleSubmit, because handleSubmit is passed in as a prop, and this is for internal use before actually submitting
  const selfHandleSubmit = () => {
    if(!currentlySearching){
      handleSubmit(searchTerm);
      setCurrentlySearching(true);
      setSearchTerm('');
    }
  }

  return(
    // Holder Div
    <div style={{
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Holder div for the submit and skip buttons */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        {/* Submit */}
        <button
          style={{
            border: 'none',
            backgroundColor: 'green',
            color: 'lightgrey',
            borderRadius: '5px',
            padding: '5px',
            margin: '5px',
          }}
          onClick={()=>{selfHandleSubmit()}}
        > Submit</button>

        {/* Skip */}
        <button
          style={{
            border: 'none',
            backgroundColor: 'darkgrey',
            color: 'black',
            borderRadius: '5px',
            padding: '5px',
            margin: '5px',
          }}
          onClick={handleSkip}
        > Skip</button>
      </div>

      {/* Holder div for the search bar itself */}
      <div
        style={{
          width:'657px',
          height:'40px',
          display:'flex',
          flexDirection:'row',
          alignItems:'center',
          backgroundColor:'white',
          borderTopLeftRadius:'5px',
          borderTopRightRadius:'5px',
          borderBottomLeftRadius: searchTerm==='' ? '5px' : '0px',
          borderBottomRightRadius: searchTerm==='' ? '5px' : '0px',
        }}
      >
        <FontAwesomeIcon
          icon={faSearch}
          style={{
            marginLeft:'10px',
            marginRight:'10px',
          }}
        />
        <form 
          style={{
            width:'100%',
            height:'40px',
            border:'none',
            outline:'none',
            backgroundColor:'transparent',
          }}
          onSubmit={(e)=>{e.preventDefault(); selfHandleSubmit()}}
        >
          <input
            type="text"
            style={{
              width:'100%',
              height:'40px',
              border:'none',
              outline:'none',
              backgroundColor:'transparent',
            }}
            placeholder="Search for a song"
            value={searchTerm}
            onSubmit={()=>{selfHandleSubmit()}}
            onChange={(e) => {setSearchTerm(e.target.value); setCurrentlySearching(true)}}
          />
        </form>
        <FontAwesomeIcon
          icon={faTimes}
          style={{
            marginLeft:'10px',
            marginRight:'10px',
            cursor:'pointer',
          }}
          onClick={() => setSearchTerm('')}
        />
      </div>

      {/* Show the search results */}
      {searchTerm && currentlySearching && (
        <div
          style={{
            width:'100%',
            height:'100%',
            backgroundColor:'#2F2F2F',
            zIndex:'1',
            display:'flex',
            flexDirection:'column',
          }}
        >
          {fuse.search(searchTerm).slice(0, 10).sort(
            (a, b) => {
              // @ts-ignore
              if(a.item.name < b.item.name) return -1;
              // @ts-ignore
              if(a.item.name > b.item.name) return 1;
              return 0;
            }
          ).map((song, i) => (
            <div
              // @ts-ignore
              key={song.item.name}
              style={{
                width:'100%',
                height:'40px',
                alignItems:'center',
                backgroundColor:'white',
                color:'black',
                display:'table',
                borderTop:'1px solid lightgrey',
                borderBottom:'1px solid lightgrey',
                borderBottomLeftRadius: i===9 ? '5px' : '0px',
                borderBottomRightRadius: i===9 ? '5px' : '0px',
              }}
              // @ts-ignore
              onClick={() => {setSearchTerm(song.item.name); setCurrentlySearching(false)}}
            >
              <p style={{
                paddingLeft:'10px',
                paddingRight:'10px',
                display:'table-cell',
                verticalAlign:'middle'
                // @ts-ignore
              }}>{song.item.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar;