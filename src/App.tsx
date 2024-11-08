import React, { useState } from 'react';
import logo from './logo.svg';
import Header from './Header/header'
import Teams from './Teams/teams'
import './App.css';
import ConferenceTable from './ConferenceTable/conferencetable';


interface Team{
  name: string;
  id:string;
}


function App() {

const [eastTeam, setEastTeam] = useState<Team[]>([
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
  

]);

const [westTeam,setWestTeams] = useState<Team[]>([
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

]);

const[isEastConference,setEastConference] = useState(true);

const toggleConference=()=>{
  setEastConference((prev)=>!prev);
};

  return (
    <div>
    <div>
      <Header/>
    </div>  
    <div>
    <button onClick={toggleConference}> 
        {isEastConference ? 'East' : 'West'}
      </button>
    <ConferenceTable
      teams={isEastConference? eastTeam: westTeam}
      title={isEastConference? 'East': 'West'}/>
    </div>
  </div>
    
    
  
  );
}

export default App;
