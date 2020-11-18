import happy from '../../images/emoji/happy.png';
import ghosty from '../../images/emoji/ghosty.png';
import angry from '../../images/emoji/angry.webp';
import cd from '../../images/emoji/cd.png';
import deangelo from '../../images/deangelo.png';
import erkin from '../../images/erkin.png';
import santi from '../../images/santi.png';
import disco from '../../images/silentdisco.png';

const playlistData = [
    {
        title: "Aggressive",
        color: "red",
        contrast: "rgb(49, 48, 5)",
        image: santi,
        emoji: angry,
        name: "Santigold"
    },
    {
        title: "Spooky",
        color: "black",
        contrast: "rgb(192, 191, 105)",
        image: erkin,
        emoji: ghosty,
        name: "Erkin Koray"
    },
    {
        title: "Whimsical",
        color: "lightblue",
        contrast: "rgb(107, 197, 174)",
        image: deangelo,
        emoji: happy,
        name: "D'Angelo"
    },
    {
        title: "YourPlaylist",
        color: "rgb(182 112 218)",
        contrast: "rgb(76 199 137)",
        image: disco,
        emoji: cd,
        name: "You"
    }
];

export default playlistData;