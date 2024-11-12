import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities'
import { memoryUsage } from "process";

interface SortableItemProp{
    teamName: string;
    id: string;
}

const SortableItem: React.FC<SortableItemProp> = ({id, teamName})=>{
    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        padding: '8px',
        margin: '4px',
        backgroundClour: '#f0f0f0',
        borderRadius: '4px',
    };

    return(
        <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
            {teamName}
        </li>
    );
};

export default SortableItem