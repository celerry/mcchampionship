# mcchampionship

MCC [API v1(.3.2)](https://api.mcchampionship.com/docs#/v1) wrapper with no runtime dependencies. Built with [Bun](https://bun.sh).

Not tested on Node.js, but it should work (as long as you're running node.js v18+). Feel free to open an issue/PR if it doesn't. :~)

## Examples

```js
import { v1 } from 'mcchampionship';

// Get the current event cycle's information
// https://api.mcchampionship.com/docs#/v1/AppController_getEventInformation
v1.getCurrentEventCycle().then((event) => {
    console.log(`the next event (${event.data.event}) starts at ${event.data.date}, here's the update video: ${event.data.updateVideo}`);
});

// Get the rundown of the most recent event
// https://api.mcchampionship.com/docs#/v1/AppController_getRundown
v1.getRecentEventRundown().then((rundown) => {
    console.log(`the creators in aqua team for the most recent event were ${rundown.data.creators.AQUA.join(", ")}`);
});

// Get the rundown of an event. Updates at the end of each event
// https://api.mcchampionship.com/docs#/v1/AppController_getEventRundown
v1.getEventRundown("1").then((rundown) => {
    console.log(`JackSucksAtMC's score in MCC1 was ${rundown.data.individualScores["JackSucksAtMC"]}`);
});

// Get a list of all participants in this event cycle
// https://api.mcchampionship.com/docs#/v1/AppController_getParticipants
v1.getParticipants().then((participants) => {
    let totalParticipants = 0;
    Object.keys(participants.data).forEach((team) => {
        totalParticipants += participants.data[team].length;
    });
    console.log(`there are ${totalParticipants} participants in this event cycle (including spectators)`);
});

// Get a list of all participants in the given team in this event cycle
// https://api.mcchampionship.com/docs#/v1/AppController_getParticipantsByTeam
v1.getParticipantsOfTeam(v1.Team.AQUA).then((participants) => {
    console.log(`the participants in the aqua team are ${participants.data.map((participant) => participant.username).join(", ")}`);
});



// (Deprecated) Get the entire Legacy Hall of Fame
// https://api.mcchampionship.com/docs#/%5BDeprecated%5D%20v1/AppController_getHallOfFame
v1.getHallOfFame().then((hallOfFame) => {
    // do something with the hall of fame data
});

// (Deprecated) Get all statistics in the legacy Hall of Fame for the given game
// https://api.mcchampionship.com/docs#/%5BDeprecated%5D%20v1/AppController_getHallOfFameByGame
v1.getHallOfFameGame(v1.HOFGame.MG_ACE_RACE).then((game) => {
    // do something with the game data
});
```

## Development

1. Install [Bun](https://bun.sh)
2. Install dependencies:

```bash
bun install
```

To run tests:

```bash
bun test
```