import { handleEnterKeypress, addSongToUserPlaylistReturnId } from '../utils/functions';
import "./song.css";

function Songs(props) {

  const handleAdd = (id) => {
    props.setAddConfirm(addSongToUserPlaylistReturnId(id));

    setTimeout(() => {
      props.setAddConfirm("");
    }, 2000);
  };

  const animateAddConfirm = (id) => {
    if (props.addConfirm === id) {
      return "confirm 2s linear";
    } else {
      return "";
    }
  };

  const handleRemove = (id) => {
    const playlist = JSON.parse(localStorage.getItem("pex-playlist"));
    const filtered = playlist.filter((songs) => songs.id.$t !== id);
    localStorage.setItem("pex-playlist", JSON.stringify(filtered));
    props.setRenderToggle(!props.renderToggle);
  };

  const handleStats = (id) => {
      props.watchModalData(id);
      props.setModal(true);
  };

  const dotIndicator = (id) => {
    let output = [];
    for(let i = 0; i < props.playlist.length; i++){
      output.push(props.playlist[i].id.$t);
    }
    return output;
  }

  const renderSongs = () => { 
    const arr = props.songs > 100 ? props.songs : props.songs.slice(0, 100);
    return arr.map((song, index) => {
      return (
        <li className="song-tile" key={index} id={index} tabIndex="0">
          <span className="song-title">{song.gsx$songtitle.$t}</span>
          <br />
          {song.gsx$artist.$t}
          <div className="actions">
            <div className="add-confirm" style={{ animation: animateAddConfirm(song.id.$t) }}>
              SONG ADDED
            </div>

            <div className="dot" style={{ 
              display: props.playlist && dotIndicator().includes(song.id.$t) 
                ? "block" : "none" }}>
              ⬤
            </div>

            {props.display 
              ? <span onClick={() => handleRemove(song.id.$t)} tabIndex="0" 
                  onKeyPress={(e) => handleRemove(handleEnterKeypress(e, song.id.$t))}>
                  REMOVE
                </span>
              : 
              <span onClick={() => handleAdd(song)} tabIndex="0"
                onKeyPress={(e) => handleAdd(handleEnterKeypress(e, song.id.$t))}>
                ADD
              </span>
            }

            <span onClick={() => handleStats(song.id.$t)} tabIndex="0"
              onKeyPress={(e) => handleStats(handleEnterKeypress(e, song))}>
              STATS
            </span>

          </div>
        </li>
      );
    });
  };

  const renderError = () => {
    return <div className="landing" data-testid="error">We couldn't retrieve any songs :(</div>;
  };

  return props.songs === null || props.songs === undefined ? renderError() : renderSongs();
}

export default Songs;
