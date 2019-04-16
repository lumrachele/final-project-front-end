## Weegle: The Frontend

This React web application is the frontend for Weegle, the interactive charades-like party game. <a href=https://vimeo.com/329654271>Demo Video</a>

Backend: [Weegle Backend Repository](https://github.com/lumrachele/final-project-back-end)

<h2>Contents</h2>

* [Libraries & Middleware](#libraries-&-middleware)
* [Installation](#installation)
* [Structure](#structure)
* [Main Components](#main-components)
* [User Accounts](#user-accounts)
* [Future Development](#future-development)


# <h2>Libraries & Middleware</h2>
This application was built using [Create React App](https://github.com/facebook/create-react-app). Both Redux and React state are implemented to manage the global state and local state of different components. ActionCableConsumer is used to communicate with other users in the same game via websockets, and perform actions upon receiving connections. React Webcam is used to enable use of the computer's webcam. React Router Dom is used to manage routes and browser history. React Animated CSS is used for creative transitions upon component mounting. This application is styled with Semantic UI React and custom CSS. 

# <h2>Installation</h2>
To play Weegle, fork and clone this repository, along with the [backend repository](https://github.com/lumrachele/final-project-back-end). run ```npm install``` to install all necessary dependencies as a ```node_modules directory```. Then, run ```npm start``` to run the application, and navigate to http://localhost:3001, or any port that differs from that of the backend.

# <h2>Structure</h2>

- app
  - src
    - actions
      - allActions.js
    - [components](#main-components)
    - constants
      - constants.js
      - rules.js
    - stylesheets (this directory is self-explanatory; contains all of the stylesheets for each component)
    - index.js (returns App.js wrapped in a redux state Provider component as well as an Action Cable Provider component.)
    - App.js (houses the entirety of the game play components; wrapped in a router and that switches which route and further which component is rendered based on Redux global state)
    


# <h2>Main Components</h2>

- <h3>login</h3>
This component manages the login page at the main route of the project. It accepts a user's input, and upon submission it sends a fetch request to the backend to create a username in the database. It then redirects to the home page at route ```/home```.

- <h3>home</h3>
 The ```home``` component displays the rules of the game as well as options to host or join a game using the host button, or the input box for "game room code". After a user chooses an option, the form will hide and the ```waitingRoom``` component will show, displaying all of the players in the room. The host will have the functionality to start the game.

- <h3>game</h3>
When a game has begun, the ```game``` component is rendered and the route also changes to ```/game```. Based on the status of the game, and the host attribute of the player, the following components are rendered:

  - <h3>WebcamCapture</h3>
  The host sees this component in the first stage of the game. A prompt is generated at the top of the webpage, and the webcam is accessed. At the end of the countdown, the webcam captures a photo that is then sent to the backend, uploaded to Cloudinary, stored as a url in the database, and sent back to the frontend, taking the place of the live stream of the webcam. The host clicks the "dispatch to gameroom" button, which progresses the stage of the game.

  - <h3>CaptionSubmissionPage</h3>
  During the second stage of the game, the players (not the host) will see the image that was captured along with an input form for caption submission. Players can submit as many captions as they like until the timer runs out. A "go to voting" button is displayed to go to the next stage of the game.

  - <h3>VotingPage</h3>
  In this component, players have the ability to vote on their top three favorite submitted captions. This updates each gameCaption with point values, so that the captions can be ranked in the ```results``` component.

  - <h3>Results</h3>
  The original prompt is revealed, and the captions are ranked from highest points to lowest. The host has an option to host another game, which redirects all players back to the home page.

  - <h3>inProgress</h3>
  This component is rendered whenever either the host or the players have no immediate action to do. This ```inProgress``` page displays a loading gif along with any relevant information as to what the players or the host are doing.

# <h2>User Accounts</h2>
To provide simplicity for user enjoyment, users simply create a username to join the game. No password or authentication is needed, since no user data needs to be saved.

# <h2>Future Development</h2>
- allow users to visit their Cloudinary Album of photos of the same session
- identify separate channel receiver (different from home channel) for unique game channels
- implement host function - allow users to play the same game but switch out host
- delete users upon logout
- create a react native version
- create a single device version

At this moment, this application is not accepting open source contributions.


You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
