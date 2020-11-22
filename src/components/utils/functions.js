//initial fetch request
const getSongs = () => {
    return fetch(`https://spreadsheets.google.com/feeds/list/1H5S6Vc-gCOCKLvQmfjfJmG2THtDb5Z_LQGaZJpWZQ4c/1/public/values?alt=json`)
      .then(res => {
        return res.json();
      })
      .catch(res => {
        return "Error getting song data.";
      })
};

//retrieves localStorage ids
const getUserPlaylist = () => {
  if (localStorage.getItem("pex-playlist") === null){
    return null ;
  } else
  return JSON.parse(localStorage.getItem("pex-playlist"));
}

//compares the songs against the collected attribute averages and returns a filtered songs object
const filterSongs = (songs) => {
  let agg, creep, fun;

  if (songs === null) {
    const error = {
      agg: null,
      creep:null,
      fun:null
    }
    return error;
  }
  else
  agg = songs.filter(songs => 
    songs.gsx$acousticness.$t < .2851  
    && songs.gsx$danceability.$t > .7140
    && songs.gsx$energy.$t > .4340
    && songs.gsx$liveness.$t < .2689
    && songs.gsx$speechiness.$t >= .0323
  );
  creep = songs.filter(songs => 
    songs.gsx$acousticness.$t <= .5700
    && songs.gsx$danceability.$t <= .8970
    && songs.gsx$energy.$t < .4637 
    && songs.gsx$liveness.$t <= .5189
    && songs.gsx$speechiness.$t <= .3120
  );
  fun = songs.filter(songs => 
    songs.gsx$acousticness.$t >= .0003
    && songs.gsx$danceability.$t < .8980
    && songs.gsx$energy.$t <= .7103
    && songs.gsx$instrumentalness.$t > .3175
    && songs.gsx$speechiness.$t <= .2630
  );
  const filtered = {
    agg: agg,
    creep: creep,
    fun: fun
  };
  return filtered;
};

//returns playlist modal description
const playlistModalDescription = (mood) => {
  if (mood === "Aggressive") {
    return "Aggressive songs were #1 in numerous categories, but were characterized by their Energy & Danceability."
  }
  if (mood === "Spooky") {
    return "Spooky songs had the lowest ratings in Energy & Instrumentalness, but were in the middle everywhere else."
  }
  if (mood === "Whimsical") {
    return "Whimsical songs had nearly double the Instrumentalness of the other two categories, they also came in 1st in Acousticness."
  }  
};

//calculate percentages and return an array of objects
const calculatePercent = (arr) => {
  const attributes = ["Acoustic", "Danceable", "Energetic", "Instrumental", "Live", "Speechy"];
                const percent = [.00855, .00959, .00957, .0089, .00769,.00455]; 
    return arr.map((value, index) => {
        return {
            name: attributes[index],
            percent: Math.round(Math.abs(value) / percent[index]) > 100 ? "100": Math.round(value / percent[index])
        }
    })
};


//keypress function for keyboard navigation
const handleEnterKeypress = (e, string) => {
  if(e.key === "Enter"){
      return string;
  } return false;
};


//checks for and adds a song to the users local playlist
const addSongToUserPlaylistReturnId = (id) => {
  if (localStorage.getItem("pex-playlist") === null) {
    localStorage.setItem("pex-playlist", JSON.stringify([id]));
    return id;
  }
  const playlist = JSON.parse(localStorage.getItem("pex-playlist"));

  //prevent duplicate songs in users playlist
  if (playlist.includes(id) === true) return false;

  playlist.push(id);
  localStorage.setItem("pex-playlist", JSON.stringify(playlist)); 
  return id;
};

//returns array of objects containing user playlist data - O(n^2)
const filterUserPlaylistSongs = (playlist, songs) => {
  const output = [];
  for (let i = 0; i < songs.length; i++){
    for(let j = 0; j < playlist.length; j++){
      if(songs[i].id.$t === playlist[j]){
        output.push(songs[i]);
      }
    }    
  }
  return output;
};


const returnTestUserPlaylistIds = () => {
  return [
    "https://spreadsheets.google.com/feeds/list/1H5S6Vc-gCOCKLvQmfjfJmG2THtDb5Z_LQGaZJpWZQ4c/1/public/values/bifuh",
    "https://spreadsheets.google.com/feeds/list/1H5S6Vc-gCOCKLvQmfjfJmG2THtDb5Z_LQGaZJpWZQ4c/1/public/values/uyko",
    "https://spreadsheets.google.com/feeds/list/1H5S6Vc-gCOCKLvQmfjfJmG2THtDb5Z_LQGaZJpWZQ4c/1/public/values/4omau",
    "https://spreadsheets.google.com/feeds/list/1H5S6Vc-gCOCKLvQmfjfJmG2THtDb5Z_LQGaZJpWZQ4c/1/public/values/7rl21",
    "https://spreadsheets.google.com/feeds/list/1H5S6Vc-gCOCKLvQmfjfJmG2THtDb5Z_LQGaZJpWZQ4c/1/public/values/chk2m",
    "https://spreadsheets.google.com/feeds/list/1H5S6Vc-gCOCKLvQmfjfJmG2THtDb5Z_LQGaZJpWZQ4c/1/public/values/4zuou",
    "https://spreadsheets.google.com/feeds/list/1H5S6Vc-gCOCKLvQmfjfJmG2THtDb5Z_LQGaZJpWZQ4c/1/public/values/a3vdp",
    "https://spreadsheets.google.com/feeds/list/1H5S6Vc-gCOCKLvQmfjfJmG2THtDb5Z_LQGaZJpWZQ4c/1/public/values/ajbm8",
    "https://spreadsheets.google.com/feeds/list/1H5S6Vc-gCOCKLvQmfjfJmG2THtDb5Z_LQGaZJpWZQ4c/1/public/values/a2gt8",
    "https://spreadsheets.google.com/feeds/list/1H5S6Vc-gCOCKLvQmfjfJmG2THtDb5Z_LQGaZJpWZQ4c/1/public/values/axdae",
  ]
};

const returnTestSongObject = () => {
  return [{
    id: {$t: "https://spreadsheets.google.com/feeds/list/1H5S6Vc-gCOCKLvQmfjfJmG2THtDb5Z_LQGaZJpWZQ4c/1/public/values/cokwr"},
    updated: { $t: "2020-11-18T02:57:57.093Z"},
    category: [{ scheme: "http://schemas.google.com/spreadsheets/2006", term: "http://schemas.google.com/spreadsheets/2006#list"}],
    title: { type: "text", $t: "0"},
    content: { type: "text", $t: "acousticness: 0.0102, danceability: 0.833, durationms: 204600, energy: 0.434, instrumentalness: 0.0219, key: 2, liveness: 0.165, loudness: -8.795, mode: 1, speechiness: 0.431, tempo: 150.062, timesignature: 4, valence: 0.286, target: 1, songtitle: Mask Off, artist: Future"},
    link: [{rel: "self", type: "application/atom+xml", href: "https://spreadsheets.google.com/feeds/list/1H5S6Vc-gCOCKLvQmfjfJmG2THtDb5Z_LQGaZJpWZQ4c/1/public/values/cokwr"}],
    gsx$_cn6ca: { $t: "0" },
    gsx$acousticness: { $t: "0.0102"},
    gsx$danceability: { $t: "0.833" },
    gsx$durationms: {$t: "204600"},
    gsx$energy: { $t: "0.434"},
    gsx$instrumentalness: { $t: "0.0219"}, 
    gsx$key: { $t: "2" },
    gsx$liveness: { $t: "0.165"},
    gsx$loudness: { $t: "-8.795" },
    gsx$mode: { $t: "1" },
    gsx$speechiness: { $t: "0.431" },
    gsx$tempo: { $t: "150.062"},
    gsx$timesignature: { $t: "4" },
    gsx$valence: { $t: "0.286"},
    gsx$target: { $t: "1"},
    gsx$songtitle: {$t: "Mask Off"},
    gsx$artist: {$t: "Future" }
    }]
};

//formats song object into correctly ordered array 
const formatSongObjectValues = (arr) => {
  return !arr[0].id.$t ? null :
  [arr[0].gsx$acousticness.$t, arr[0].gsx$danceability.$t, arr[0].gsx$energy.$t, arr[0].gsx$instrumentalness.$t, arr[0].gsx$liveness.$t, arr[0].gsx$speechiness.$t];
}

//formats percent string for modal spans
const formatPercentString = (num) => {
  return num > 100 ? "50%" : (num / 2 + 50) + "%";
};

module.exports = { 
  getSongs, getUserPlaylist, filterSongs, formatPercentString,
  playlistModalDescription, calculatePercent, handleEnterKeypress, addSongToUserPlaylistReturnId,
  filterUserPlaylistSongs, returnTestUserPlaylistIds, returnTestSongObject, formatSongObjectValues
}