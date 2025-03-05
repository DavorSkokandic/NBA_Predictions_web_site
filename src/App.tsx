import React, { useState } from 'react';
import Header from './Header/header'
import Teams from './Teams/teams'
import './App.css';
import ConferenceTable from './ConferenceTable/conferencetable';


interface Team{
  name: string;
  id:string;
}


function App() {

const initialEastTeams: Team[] = [
  {name: 'Boston Celtics', id: '1'},
  {name: 'Milwaukee Bucks', id: '2'},
  {name: 'Cleveland Cavaliers', id: '3'},
  {name: 'Indiana Pacers', id: '4'},
  {name: 'New York Knicks', id: '5'},
  {name: 'Miami Heat', id: '6'},
  {name: 'Philadelphia 76', id: '7'},
  {name: 'Chicago Bulls', id: '8'},
  {name: 'Orlando Magic', id: '9'},
  {name: 'Atlanta Hawks', id: '10'},
  {name: 'Toronto Raptors', id: '11'},
  {name: 'Brooklyn Nets', id: '12'},
  {name: 'Charlotte Hornets', id: '13'},
  {name: 'Detroit Pistons', id: '14'},
  {name: 'Washington Wizards', id: '15'},
];

const initialWestTeams: Team[] = [
  {name: 'Los Angeles Lakers', id: '1'},
  {name: 'Denver Nuggets', id: '2'},
  {name: 'Pheonix Suns', id: '3'},
  {name: 'Dallas Mavericks', id: '4'},
  {name: 'Oklahoma City Thunder', id: '5'},
  {name: 'Golden State Warriors', id: '6'},
  {name: 'Houston Rockets', id: '7'},
  {name: 'Minesota Timberwolwes', id: '8'},
  {name: 'Sacramento Kings', id: '9'},
  {name: 'New Orleans Pelicans', id: '10'},
  {name: 'San Antonio Spurs', id: '11'},
  {name: 'Portland Trail Blazers', id: '12'},
  {name: 'Memphis Grizzlies', id: '13'},
  {name: 'Los Angeles Clippers', id: '14'},
  {name: 'Utah Jazz', id: '15'},

];

const [eastTeam, setEastTeam] = useState<Team[]>(initialEastTeams);
const [westTeam, setWestTeams] = useState<Team[]>(initialWestTeams);
const [eastSlots, setEastSlots] = useState<(Team | null)[]>(Array(initialEastTeams.length).fill(null));
const [westSlots, setWestSlots] = useState<(Team | null)[]>(Array(initialWestTeams.length).fill(null));
const [isEastConference, setEastConference] = useState(true);


const toggleConference = () => {
  setEastConference((prev) => !prev);
};
const handleDragEnd = (updatedTeams: Team[], updatedSlots: (Team | null)[]) => {
  if (isEastConference) {
    setEastTeam(updatedTeams);
    setEastSlots(updatedSlots);
  } else {
    setWestTeams(updatedTeams);
    setWestSlots(updatedSlots);
  }
};


const resetTeams = () => {
  setEastTeam([...initialEastTeams]);
  setWestTeams([...initialWestTeams]);
  setEastSlots(Array(initialEastTeams.length).fill(null));
  setWestSlots(Array(initialWestTeams.length).fill(null));
}

return (
  <div>
    <Header />
    <div>
      <button onClick={toggleConference}>
        {isEastConference ? 'Switch to West' : 'Switch to East'}
      </button>
      <button onClick={resetTeams}>Reset</button>
      <ConferenceTable
        teams={isEastConference ? eastTeam : westTeam}
        onDragEnd={handleDragEnd}
        title={isEastConference ? 'East Conference' : 'West Conference'}
        slots={isEastConference ? eastSlots : westSlots}
      />
    </div>
  </div>
);
}

export default App;
