import {useState, useEffect, useRef} from 'react';
import ListCards from './components/playlistcards/ListCards';
import Footer from './images/grass-footer.png';
import UserPlaylist from './components/userplaylist/UserPlaylist';
import Modal from './components/modal/Modal';
import Songs from './components/songs/Songs'
import arrow from './images/icon/down-arrow.png'
import { getSongs, getUserPlaylist, filterSongs } from './components/utils/functions'
import { spooky, aggro, whimsical } from './components/utils/stats'
import './App.css';


function App() {
  const [songs, setSongs] = useState();
  const [display, setDisplay] = useState("");
  const [filteredSongs, setFilteredSongs] = useState({});
  const [right, setRight] = useState("100%");
  const [addConfirm, setAddConfirm] = useState("");
  const scrollRef = useRef();
  const [modal, setModal] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [modalData, setModalData] = useState("");
  const [modalType, setModalType] = useState("");
 

  useEffect(() => {
    getSongs()
      .then(res => {
          if(res === "Error getting song data."){
            setSongs(null);
            setFilteredSongs(filterSongs(null));
            return false;
          } 
          setSongs(res.feed.entry);
          setFilteredSongs(filterSongs(res.feed.entry));
      })
  }, []);

  

  const handleUpArrow = () => { 
    scrollRef.current.scrollIntoView({
      block: 'end',
      behavior: 'smooth'
    });
  };

  const handleDownArrow = () => { 
    scrollRef.current.scrollIntoView({
      behavior: 'smooth'
    });
  };
  
  const handleKeyArrow = (e, direction) => {
    if ( e.key === "Enter" && direction === "up" ) {
        handleUpArrow();
    }
    if ( e.key === "Enter" && direction === "down" ) {
      handleDownArrow();
    }  
    return false;
  };

  const watchModalData = (id) => {
    
    if ( id === "Aggressive" ){
      setModalType("playlist");
      setModalData(aggro);
    }
    if ( id === "Spooky" ){
      setModalType("playlist");
      setModalData(spooky);
    }
    if ( id === "Whimsical" ){
      setModalType("playlist");
      setModalData(whimsical);
    }
    if ( id === "Your Playlist" ){
      setModalType("user-playlist");
      setModalData(getUserPlaylist());
    }
    if ( id.startsWith('https') ){
      setModalType("song");
      const songModalData = songs.filter(song => song.id.$t === id);
      setModalData(songModalData);
    }
  };

  const renderLanding = () => {
    let message;
    if(songs === null) message = "LOADING";
    else
    message = "HOW ARE YOU FEELING?";
    return (
      <div className="landing">
        <span>▲</span>
        {message}
      </div> 
    )
  };
 

  let background =
  display === "Aggressive" 
  ? "rgb(10, 10, 163),rgb(70, 233, 255)" 
  : display === "Spooky" 
  ? "rgb(0, 0, 0),rgb(39, 53, 116)"
  : display === "Whimsical" 
  ? "rgb(34, 169, 231),rgb(119 230 255 / 92%)" : "black";

  let data = 
  display === "Aggressive" 
  ? filteredSongs.agg 
  : display === "Spooky" 
  ? filteredSongs.creep
  : display === "Whimsical"
  ? filteredSongs.fun 
  : display === "Your Playlist"
  ? songs 
  : null;  

  return (
    <>
      <section className="playlist-cards" data-testid="card-header">
        <ListCards setDisplay={setDisplay} setRight={setRight} display={display} 
          setModal={setModal} setOpacity={setOpacity} watchModalData={watchModalData}/>
      </section>

      <div className="modal-wrapper" style={{ opacity: opacity }}>
          <Modal modal={modal} setModal={setModal} data={modalData} modalType={modalType} songs={songs}/>
      </div>

      {display === "" ? renderLanding() : ""}

      <section className="playlist-songs" style={{ right: right, backgroundImage: `linear-gradient(${background})`}}>
       
        <ul className="song-container">
            {display === "Your Playlist"
            ? <UserPlaylist songs={songs} display={display}
            setModal={setModal} setOpacity={setOpacity} watchModalData={watchModalData} playlist={getUserPlaylist()}/>
            : <Songs songs={data} addConfirm={addConfirm} setAddConfirm={setAddConfirm} 
              setModal={setModal} setOpacity={setOpacity} watchModalData={watchModalData} playlist={getUserPlaylist()}/> }   
        </ul>

        <div className="direction" ref={scrollRef}>
          <img onClick={() => handleUpArrow()} src={arrow} className="arrow up"
            tabIndex="0" onKeyPress={(e) => handleKeyArrow(e, "up")} alt="Up Arrow"/>
          <img onClick={() => handleDownArrow()} src={arrow} className="arrow"
            tabIndex="0" onKeyPress={(e) => handleKeyArrow(e, "down")} alt="Down Arrow"/>
        </div>
        
        <div className="footer">          
          <img className="footer-img" src={Footer} alt="Blades of grass" />
        </div>

      </section>
    </>
  );
}

export default App;
