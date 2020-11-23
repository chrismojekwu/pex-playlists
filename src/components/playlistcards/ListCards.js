import './listcards.css';
import { handleEnterKeypress } from '../utils/functions';
import playlistData from './../utils/playlist-data' 
import { useState } from 'react';


function ListCards(props){
    const [mouseEnter, setMouseEnter] = useState(0);

    const cards = playlistData;

    const handleClick = title => {
        props.setRight("100%");

        setTimeout(() => {
            props.setDisplay(title);
            props.setRight("0%");
        }, 700);
    };

    const handleDoubleClick = title => {
        props.watchModalData(title); 
        props.setModal(true) 
    };

    return (
        <>
            {cards.map((card,index) => {
                const color = props.display === card.title ? "rgb(77 255 82)" : card.color;
                return (
                <div 
                    className="playlist-card" 
                    style={{ backgroundColor: color }}
                    key={index}
                    onClick={() => handleClick(card.title)}
                    tabIndex="0"
                    onKeyPress={e => handleClick(handleEnterKeypress(e, card.title))}
                >
                    <span className="card-title">
                        {card.title}
                    </span>
                    <img 
                        className="card-img" src={card.image} alt={`Photo of ${card.name}`}
                        onMouseEnter={()=> setMouseEnter(1)}
                        onMouseLeave={() => setMouseEnter(0)}
                    />
                    <span className="card-photo-name" style={{opacity: mouseEnter}}>
                        {card.name}
                    </span>
                    <div className="emoji-div" onDoubleClick={() => handleDoubleClick(card.title)}
                        style={{ borderColor: card.contrast, backgroundColor: card.contrast }} >
                        <img className="emoji" src={card.emoji} alt="Emoji"/>
                    </div>
                </div>
                )
            })}
        </>
    );
};

export default ListCards;