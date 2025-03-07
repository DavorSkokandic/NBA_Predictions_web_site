import React, { useState } from 'react';
import Header from './Header/header'
import './App.css';
import ConferenceTable from './ConferenceTable/conferencetable';


interface Team{
  name: string;
  id:string;
  logo:string;
}


function App() {

const initialEastTeams: Team[] = [
  {name: 'Boston Celtics', id: '1', logo:"../images/bos.png"},
  {name: 'Milwaukee Bucks', id: '2', logo:"../images/mil.png"},
  {name: 'Cleveland Cavaliers', id: '3', logo:"../images/cle.png"},
  {name: 'Indiana Pacers', id: '4', logo:"../images/ind.png"},
  {name: 'New York Knicks', id: '5', logo:"../images/nyk.png"},
  {name: 'Miami Heat', id: '6', logo:"../images/mia.png"},
  {name: 'Philadelphia 76', id: '7', logo:"../images/phi.png"},
  {name: 'Chicago Bulls', id: '8',  logo:"../images/chi.png"},
  {name: 'Orlando Magic', id: '9', logo:"../images/orl.png"},
  {name: 'Atlanta Hawks', id: '10',  logo:"../images/atl.png"},
  {name: 'Toronto Raptors', id: '11', logo:"../images/tor.png"},
  {name: 'Brooklyn Nets', id: '12', logo:"../images/bkn.png"},
  {name: 'Charlotte Hornets', id: '13', logo:"../images/cha.png"},
  {name: 'Detroit Pistons', id: '14', logo:"../images/det.png"},
  {name: 'Washington Wizards', id: '15', logo:"../images/was.png"},
];

const initialWestTeams: Team[] = [
  {name: 'Los Angeles Lakers', id: '1', logo:"../images/lal.png"},
  {name: 'Denver Nuggets', id: '2', logo:"../images/den.png"},
  {name: 'Pheonix Suns', id: '3', logo:"../images/phx.png"},
  {name: 'Dallas Mavericks', id: '4', logo:"../images/dal.png"},
  {name: 'Oklahoma City Thunder', id: '5', logo:"../images/okc.png"},
  {name: 'Golden State Warriors', id: '6', logo:"../images/gsw.png"},
  {name: 'Houston Rockets', id: '7', logo:"../images/hou.png"},
  {name: 'Minesota Timberwolwes', id: '8', logo:"../images/min.png"},
  {name: 'Sacramento Kings', id: '9', logo:"../images/sac.png"},
  {name: 'New Orleans Pelicans', id: '10', logo:"../images/nop.png"},
  {name: 'San Antonio Spurs', id: '11', logo:"../images/sas.png"},
  {name: 'Portland Trail Blazers', id: '12', logo:"../images/por.png"},
  {name: 'Memphis Grizzlies', id: '13', logo:"../images/mem.png"},
  {name: 'Los Angeles Clippers', id: '14', logo:"../images/lac.png"},
  {name: 'Utah Jazz', id: '15', logo:"../images/uta.png"},

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
    <div className="controls">
      <button onClick={toggleConference} className="toggle-switch">
        <span className={`toggle-switch-label ${isEastConference ? 'active' : ''}`}>
          East
        </span>
        <span className={`toggle-switch-label ${!isEastConference ? 'active' : ''}`}>
          West
        </span>
        <div className={`toggle-switch-slider ${isEastConference ? 'east' : 'west'}`} />
      </button>
      <button onClick={resetTeams} className="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            viewBox="0 0 20 20"
            height="20"
            fill="none"
            className="svg-icon"
          >
            <g strokeWidth="1.5" strokeLinecap="round" stroke="#ff342b">
              <path d="m3.33337 10.8333c0 3.6819 2.98477 6.6667 6.66663 6.6667 3.682 0 6.6667-2.9848 6.6667-6.6667 0-3.68188-2.9847-6.66664-6.6667-6.66664-1.29938 0-2.51191.37174-3.5371 1.01468"></path>
              <path d="m7.69867 1.58163-1.44987 3.28435c-.18587.42104.00478.91303.42582 1.0989l3.28438 1.44986"></path>
            </g>
          </svg>
          <span className="lable">Reset</span>
        </button>

    </div>
    <ConferenceTable
      teams={isEastConference ? eastTeam : westTeam}
      onDragEnd={handleDragEnd}
      title={isEastConference ? 'East Conference' : 'West Conference'}
      slots={isEastConference ? eastSlots : westSlots}
    />
  </div>
);
}

export default App;
