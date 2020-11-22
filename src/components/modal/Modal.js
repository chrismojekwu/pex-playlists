import { useState } from 'react';
import X from '../../images/icon/x.png';
import './modal.css';
import { playlistModalDescription, calculatePercent, formatSongObjectValues, formatPercentString, averageUserPlaylist } from '../utils/functions';

function Modal(props) {
    const [percentWidth, setPercentWidth] = useState();

    const animatePercentageBar = (action, percent) => {
        action === "in" ? setPercentWidth(percent) : setPercentWidth("50%");
    };

    const renderXIcon = () => {
        return (
            <div>
                <img className="x-icon" onClick={() => props.setModal(false)} src={X} alt="X Icon" data-testid="X Icon"
                    onKeyPress={e => e.key === "Enter" ? props.setModal(false) : false} tabIndex="0" />
            </div> 
        );
    };

    const renderPlaylistData = () => {
        
        const renderSpans = (data) => {
            let ranks = [];
            for(const attribute in data){
                if(attribute !== "name"){
                    ranks.push({name: data[attribute].name, rank: data[attribute].rank});
                }; 
            };
            
            return ranks.map((attribute, index) => {
                return (
                    <span className="outer" key={index}>
                        {attribute.name}
                        <span className="inner">
                            {attribute.rank}
                        </span>
                    </span>
                );
            });
        };
        
        return (
            <>                  
                {playlistModalDescription(props.data.name)}
                <h4>Ranks:</h4>
                <div className="playlist-modal-rank-titles">
                    {renderSpans(props.data)}
                </div>
                <div className="asterisk">* Loudness is included but was not a deciding factor.</div>
            </>
        );
    };

    const renderUserPlaylistData = () => {
        //checks if data is too small empty or null and returns a message
        let message = "";
        if (props.data === null || props.songs === null || props.data.length === 0){
            message = "Please add songs to your playlist to get a rating."
            return (
                <>                    
                    <h4>Sorry!</h4> 
                    {message}
                </>
            )
        } else //other wise create title
        message = "Your Playlist is";
        
        let calculatedData = averageUserPlaylist(props.data, props.songs);
        
        let percentObjectArray = calculatePercent(calculatedData.collected);
        
        return (  
            <>
                {message}{calculatedData.category}
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
            </>  
              
        );
    };

    const renderSongData = () => {
        
        //collect values from song data    
        const values = formatSongObjectValues(props.data);
        
        //create array of percent objects
        const songPercentArray = calculatePercent(values);
           
        return (
            <>                
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
            </>
        );
    };

    const renderModal = () => {
        return (
            <div className="modal">
                <div className="modal-content">
                      {renderXIcon()} 
                          {props.modalType === "playlist"  
                              ? renderPlaylistData() 
                              : props.modalType === "song"
                              ? renderSongData()
                              : props.modalType === "user-playlist"
                              ? renderUserPlaylistData()
                              : "" }
                  </div>
            </div>
        )
    };

    return props.modal === true ? renderModal() : "";
}

export default Modal;