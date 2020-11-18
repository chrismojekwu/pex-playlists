import { useState } from 'react';
import X from '../../images/icon/x.png';
import './modal.css';
import { playlistModalDescription, calculatePercent } from '../utils/functions';

function Modal(props) {
    const [percentWidth, setPercentWidth] = useState();

    const animatePercentageBar = (action, percent) => {
        action === "in" ? setPercentWidth(percent) : setPercentWidth("50%");
    };

    const renderXIcon = () => {
        return (
            <div>
                <img className="x-icon" onClick={() => props.setModal(false)} src={X} alt="X Icon" data-testid="X Icon"/>
            </div> 
        );
    };

    const formatPercentString = (num) => {
        return num > 100 ? "50%" : (num / 2 + 50) + "%";
    };

    const renderPlaylistData = () => {
        
        return (
            <div className="modal">
                <div className="modal-content">
                {renderXIcon()}   
                    {playlistModalDescription(props.data.name)}
                    <h4>Ranks:</h4>
                    <div className="playlist-modal-rank-titles">
                        <span className="outer">Acousticness<span className="inner">{props.data.acoustic.rank}</span></span>
                        <span className="outer">Danceability<span className="inner">{props.data.dance.rank}</span></span>
                        <span className="outer">Energy<span className="inner">{props.data.energy.rank}</span></span>
                        <span className="outer">Instrumentalness<span className="inner">{props.data.instru.rank}</span></span>
                        <span className="outer">Liveness<span className="inner">{props.data.live.rank}</span></span>
                        <span className="outer">Loudness<span className="inner">{props.data.loud.rank}</span></span>
                        <span className="outer">Speechiness<span className="inner">{props.data.speech.rank}</span></span>
                    </div>
                    <div className="asterisk">* Loudness is included but was not a deciding factor.</div>
                </div>
            </div>
        );
    };

    const renderUserPlaylistData = () => {
        //checks if data is too small empty or null and returns a message
        let message = "";
        if (props.data.length === 0 || props.data === null || props.songs === null){
            message = "Please add songs to your playlist to get a rating."

            
            return (
                <div className="modal">
                    <div className="modal-content">
                    {renderXIcon()} 
                        <h4>Sorry!</h4> 
                        {message}
                    </div>
                </div>
            )
        } else //other wise create title
        message = "Your Playlist is";

        //create playlist array and filter songs by id
        const playlist = [];

        for (let i = 0; i < props.data.length; i++){
            playlist.push(props.songs.filter(song => song.id.$t === props.data[i]));
        }
        playlist.flat()

        //create values arrays and collect playlist attribute values
        let acoustic = [], dance = [], energy = [], instru = [], live = [], speech = [];

        for (let j = 0; j < playlist.length; j++){
            acoustic.push(playlist[j][0].gsx$acousticness.$t);
            dance.push(playlist[j][0].gsx$danceability.$t);
            energy.push(playlist[j][0].gsx$energy.$t);
            instru.push(playlist[j][0].gsx$instrumentalness.$t);
            live.push(playlist[j][0].gsx$liveness.$t);
            speech.push(playlist[j][0].gsx$speechiness.$t);
        }

        //collect value arrays in larger array
        const collected = [acoustic, dance, energy, instru, live, speech];

        //loop thru collected values and create an array of averaged values
        for (let i = 0; i < collected.length; i++){
            collected[i] = 
            ((collected[i].map(x => parseFloat(x)).reduce((x,y) => x + y, 0)) / collected[i].length).toFixed(4);
        }

        //create category string
        let category = "";
        
        //test averages against hardcoded values determined from surveyed songs and create the correct string
        (+collected[1] > .7140 && +collected[2] > .4340) === true
            ? category = " Aggressive"
            : (+collected[0] <= .5700 && +collected[1] <= .8970 && +collected[2] < .4637) === true
            ? category = " Spooky"
            : (+collected[0] >= .0003 && +collected[3] > .3175) === true
            ? category = " Whimsical" : category = " Unclear"; 
        
        //user percentage function to create array of values
        let percentObjectArray = calculatePercent(collected);
        
        return (
            <div className="modal">
                <div className="modal-content">
                {renderXIcon()} 
                        {message}{category}
                        <h4>Stats:</h4>
                    <div className="playlist-modal-rank-titles">
                        {percentObjectArray.map((percent, index) => {
                        
                            //create string for css and text display
                            const spanPercent = formatPercentString(percent.percent);
                            
                            //return spans with according functions and values
                            return (
                                <span className="percent" key={index} style={{width: percentWidth}} onMouseEnter={() => animatePercentageBar("in", spanPercent )} 
                                    onMouseOut={() => animatePercentageBar("out")}>
                                    {percent.percent}{"% "}{percent.name}
                                </span>
                            );
                        })}
                    </div>    
                </div>
            </div>
        );
    };

    const renderSongData = () => {
        
        //collect values from song data    
        const values = [props.data[0].gsx$acousticness.$t, props.data[0].gsx$danceability.$t, props.data[0].gsx$energy.$t, props.data[0].gsx$instrumentalness.$t, props.data[0].gsx$liveness.$t, props.data[0].gsx$speechiness.$t];
        
        //creat array of percent objects
        const songPercentArray = calculatePercent(values);
           
        return (
            <div className="modal">
                <div className="modal-content">
                {renderXIcon()} 
                    <h4>{props.data[0].gsx$artist.$t}</h4>
                    <span>{props.data[0].gsx$songtitle.$t}</span>
                    <h4>Stats:</h4>
                    <div className="playlist-modal-rank-titles">
                        {songPercentArray.map((percent, index) => {

                            //create string for css and text display
                            const spanPercent = formatPercentString(percent.percent);

                            //return spans with according functions and values
                            return (
                                <span className="percent" key={index} style={{width: percentWidth}} onMouseEnter={() => animatePercentageBar("in", spanPercent )} 
                                    onMouseOut={() => animatePercentageBar("out")}>
                                    {percent.percent}{"% "}{percent.name}
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    };

    return  props.modal === true && props.modalType === "playlist"  
        ? renderPlaylistData() 
        : props.modal === true && props.modalType === "song"
        ? renderSongData()
        : props.modal === true && props.modalType === "user-playlist"
        ? renderUserPlaylistData()
        : "" ;
}

export default Modal;