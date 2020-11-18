const spooky = 
 {
  name: "Spooky", 
  acoustic: { avg: '0.1441', min: 0.000313, max: 0.555, rank: "2nd", name: "Acousticness" },
  dance: { avg: '0.674', min: 0.266, max: 0.959, rank: "2nd", name: "Danceability" },
  energy: { avg: '0.604', min: 0.348, max: 0.918, rank: "3rd", name: "Energy" },
  instru: { avg: '0.0936', min: 0, max: 0.821, rank: "3rd", name: "Instrumentalness" },
  live: { avg: '0.221', min: 0.0338, max: 0.769, rank: "2nd", name: "Liveness"  },
  loud: { avg: '-8.1', min: -13.702, max: -4.108, rank: "3rd", name: "Loudness" },
  speech: { avg: '0.108', min: 0.0267, max: 0.455, rank: "2nd", name: "Speechiness" },
}

const aggro = 
 {
  name: "Aggressive",
  acoustic: { avg: '0.0921', min: 0.00024, max: 0.727, rank: "3rd", name: "Acousticness" },
  dance: { avg: '0.690', min: 0.224, max: 0.897, rank: "1st", name: "Danceability" },
  energy: { avg: '0.725', min: 0.434, max: 0.957, rank: "1st", name: "Energy" },
  instru: { avg: '0.1188', min: 0, max: 0.865, rank: "2nd", name: "Instrumentalness" },
  live: { avg: '0.222', min: 0.0188, max: 0.749, rank: "1st", name: "Liveness"  },
  loud: { avg: '-6.1', min: -12.037, max: -1.71, rank: "1st", name: "Loudness"  },
  speech: { avg: '0.142', min: 0.0323, max: 0.431, rank: "1st", name: "Speechiness"  },
}

const whimsical =
 {
  name: "Whimsical",
  acoustic: { avg: '0.2001', min: 0.000145, max: 0.855, rank: "1st", name: "Acousticness"  },
  dance: { avg: '0.647', min: 0.309, max: 0.898, rank: "3rd", name: "Danceability"  },
  energy: { avg: '0.615', min: 0.217, max: 0.955, rank: "2nd", name: "Energy" },
  instru: { avg: '0.2175', min: 0, max: 0.89, rank: "1st", name: "Instrumentalness" },
  live: { avg: '0.199', min: 0.0378, max: 0.667, rank: "3rd", name: "Liveness" },
  loud: { avg: '-9.3', min: -16.4, max: -3.916, rank: "2nd", name: "Loudness"  },
  speech: { avg: '0.066', min: 0.0261, max: 0.262, rank: "3rd", name: "Speechiness" },
}

const All = 
 {
  acoustic: {
    avg: '0.1481',
    min: 0.000145,
    max: 0.855,
    range: { min: [Array], mid: [Array], max: [Array] }
  },
  dance: {
    avg: '0.669',
    min: 0.224,
    max: 0.959,
    range: { min: [Array], mid: [Array], max: [Array] }
  },
  energy: {
    avg: '0.645',
    min: 0.217,
    max: 0.957,
    range: { min: [Array], mid: [Array], max: [Array] }
  },
  instru: {
    avg: '0.1460',
    min: 0,
    max: 0.89,
    range: { min: [Array], mid: [Array], max: [Array] }
  },
  live: {
    avg: '0.213',
    min: 0.0188,
    max: 0.769,
    range: { min: [Array], mid: [Array], max: [Array] }
  },
  loud: {
    avg: '-7.9',
    min: -16.4,
    max: -1.71,
    range: { min: [Array], mid: [Array], max: [Array] }
  },
  speech: {
    avg: '0.103',
    min: 0.0261,
    max: 0.455,
    range: { min: [Array], mid: [Array], max: [Array] }
  },
  tempo: {
    avg: '117.92',
    min: 73.061,
    max: 175.88,
    range: { min: [Array], mid: [Array], max: [Array] }
  }
}

const rangeAll = 
 {
  acoustic: {
    min: [ '0.0001', '0.2851' ],
    mid: [ '0.2851', '0.5700' ],
    max: [ '0.5700', '0.8550' ]
  },
  dance: {
    min: [ '0.2240', '0.4690' ],
    mid: [ '0.4690', '0.7140' ],
    max: [ '0.7140', '0.9590' ]
  },
  energy: {
    min: [ '0.2170', '0.4637' ],
    mid: [ '0.4637', '0.7103' ],
    max: [ '0.7103', '0.9570' ]
  },
  instru: {
    min: [ '0.0000', '0.2967' ],
    mid: [ '0.2967', '0.5933' ],
    max: [ '0.5933', '0.8900' ]
  },
  live: {
    min: [ '0.0188', '0.2689' ],
    mid: [ '0.2689', '0.5189' ],
    max: [ '0.5189', '0.7690' ]
  },
  loud: {
    min: [ '-16.4000', '-10.3633' ],
    mid: [ '-10.3633', '-4.3267' ],
    max: [ '-4.3267', '-1.7100' ]
  },
  speech: {
    min: [ '0.0261', '0.1691' ],
    mid: [ '0.1691', '0.3120' ],
    max: [ '0.3120', '0.4550' ]
  },
  tempo: {
    min: [ '73.0610', '107.3340' ],
    mid: [ '107.3340', '141.6070' ],
    max: [ '141.6070', '175.8800' ]
  }
}



const samplePercent = (range) => {
    const output = {};
    for ( const attr in range ){
        if ( attr === 'loud' ) {
            output[attr] = {
                percent: Math.abs(parseFloat(range[attr].min[0])) / 100,
                }
        } else
        output[attr] = {
                        percent: range[attr].max[1]/ 100,
                        }
    }
    return output;
};


const percentage = () => {
    return {
        acoustic: { percent: 0.00855 },
        dance: { percent: 0.00959 },
        energy: { percent: 0.00957 },
        instru: { percent: 0.0089 },
        live: { percent: 0.00769 },
        loud: { percent: 0.16399999999999998 },
        speech: { percent: 0.00455 },
        tempo: { percent: 1.7588 }
      };
};

module.exports = {spooky , aggro, whimsical}
