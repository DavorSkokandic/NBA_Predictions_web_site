import React from "react";

interface Team{
    name: string;
    id: string;
}

interface ConferenceTableProps{
    teams: Team[];
    title: string;
}

const ConferenceTable: React.FC<ConferenceTableProps> = ({teams,title})=>(
<div>
    <h2>{title}</h2>
    <ul>
        {teams.map((team)=>(
            <li key={team.name}>{team.id}. {team.name}</li>
        ))}
    </ul>
</div>

);

export default ConferenceTable