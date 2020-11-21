import {useState, useEffect} from 'react';
import { getUserPlaylist ,filterUserPlaylistSongs} from '../utils/functions';
import Song from '../songs/Songs';
import './userplaylist.css';

function UserPlaylist(props) {
    const [playlist, setPlaylist] = useState([]);
    const [renderToggle, setRenderToggle] = useState(false);
    
    useEffect(()=> {
        setPlaylist(getUserPlaylist())
    }, [renderToggle]);

    const renderError = () => {
        return (
            <div className="landing" data-testid="error">
                  We couldn't retrieve any songs :(
            </div> 
        );
    };

    return props.songs === null 
        ?   renderError()
        :   playlist !== null && playlist[0] !== undefined
        ?   <Song songs={filterUserPlaylistSongs(playlist, props.songs)} display={props.display} 
                setRenderToggle={setRenderToggle} renderToggle={renderToggle}
                setModal={props.setModal} watchModalData={props.watchModalData} 
            /> 
        :   <div className="no-list" data-testid="emptyplaylist">
            <span>▲</span>
            TRY ADDING SONGS TO YOUR PLAYLIST
            </div> ;
}

export default UserPlaylist;


