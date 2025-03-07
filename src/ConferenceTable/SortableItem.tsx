// SortableItem.tsx
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "./conferencetable.css"; // Import CSS here

interface SortableItemProps {
  teamName: string;
  id: string;
  logo: string;
}

const SortableItem: React.FC<SortableItemProps> = ({ id, teamName, logo }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, animateLayoutChanges: () => false, });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || 'none',
    padding: '8px',
    margin: '4px',
    backgroundClour: '#f0f0f0',
    borderRadius: '4px',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="sortable-item">
      <img src={logo} className="team-logo"/>
      <span>{teamName}</span>
    </div>
  );
};

export default SortableItem;