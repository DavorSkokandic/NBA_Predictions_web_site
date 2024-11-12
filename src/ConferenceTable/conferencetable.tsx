import React from "react";
import './conferencetable.css';
import {sortableKeyboardCoordinates, verticalListSortingStrategy, SortableContext} from '@dnd-kit/sortable'
import {DndContext, useSensor, useSensors, PointerSensor, DragEndEvent} from '@dnd-kit/core'
import { arrayMove } from "@dnd-kit/sortable";
import './SortableItem'
import SortableItem from "./SortableItem";

interface Team{
    name: string;
    id: string;
}

interface ConferenceTableProps{
    teams: Team[];
    title: string;
    onDragEnd:(updatedTems: Team[])=> void;
}

const ConferenceTable: React.FC<ConferenceTableProps> = ({teams,title, onDragEnd})=>{
    const sensors=useSensors(
        useSensor(PointerSensor, {activationConstraint: {distance: 5}})
    );

    const handleDragEnd = (event: DragEndEvent)=>{
        const {active, over} = event;
        if(over && active.id !==over.id){
           const oldIndex=teams.findIndex((team)=>team.id===active.id);
           const newIndex=teams.findIndex((team)=>team.id===over.id);
           const updatedTeams= arrayMove(teams,oldIndex,newIndex);
           onDragEnd(updatedTeams)
            
        };
    };


return(
    <div className="body">
        <h2 className="title">{title}</h2>
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <SortableContext items={teams.map((team)=>team.id)} strategy={verticalListSortingStrategy}>
                <ul>
                    {teams.map((team)=>(
                        <SortableItem key={team.id} id={team.id} teamName={team.name}/>
                    ))}
                </ul>

            </SortableContext>
        </DndContext>

    </div>
);

}

export default ConferenceTable