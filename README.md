# Pex Playlist Submission  

Live Link - (https://pex-playlists.vercel.app/)

My goal for this submission was to create a responsive application that displays songs according to 3 supplied moods.

Foremost I wanted to make sure the songs were categorized well so I listened to the first 100 songs on the playlist and categorized them. I tried to stay as neutral as possible but the data is biased. 

After completing my review of the songs, I used Javascript to average the values of the provided attributes of the songs in each playlist. 

I also calculated a 3 part range of the values and used that data to find a 1st, 2nd and 3rd rank for the playlists.

I found out that not many songs met the average standards so I tuned the values based on the collected numbers and mood defining songs.

In terms of the presentation of the data I used HTML & CSS alongside JSX & Javascript to create a dynamic single page interface for the user that retains its core functionality on mobile.

## Features
- A user can view the songs that made it on the seperate playlists.

- Each playlist contains an informational modal with its rank in the collected attributes.

- A user can view a specific songs attribute percentage which is based on the collected ranges.

- A user can create their own playlist, which after reaching a reasonable number of songs will recieve a percentage value in relation to the collected ranges, and also may be catagorized. 


### Tech Used
React, Javascript, Html, Css

### Future Updates..
If I had more time, direction and ability I would like to do the following.

- Research: I would like to learn more about the attributes of songs, in my opinion...based on my opinion they seemed pretty accurate. Outside of loudness & tempo which were direct values all the other attributes are derived from a number of things. 

- Componentization: My approach consists of 4 components and utility functions that could be improved for reusability and performance. 

- Testing: The application is not fully tested in any means I would have liked to dive deeper into the testing and also test the utility functions. 

- Music: I think an interesting next step would be to actually have some music streaming. 

- User Song Ratings: It would be great to have users categorize songs and collect the values based off peoples responses. I also think it would be really interesting to see what songs elicit what moods for individuals or friends.
