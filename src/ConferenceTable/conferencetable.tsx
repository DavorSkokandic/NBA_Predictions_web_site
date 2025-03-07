import React, { useEffect, useState } from 'react';
import './conferencetable.css';
import {SortableContext, verticalListSortingStrategy, arrayMove,} from '@dnd-kit/sortable';
import {DndContext,useSensor,useSensors,PointerSensor,DragEndEvent,useDroppable,} from '@dnd-kit/core';
import SortableItem from './SortableItem';

interface Team {
  name: string;
  id: string;
  logo: string;
}

interface ConferenceTableProps {
  teams: Team[];
  title: string;
  onDragEnd: (teams: Team[], slots: (Team | null)[]) => void;
  slots: (Team | null)[];
}

const ConferenceTable: React.FC<ConferenceTableProps> = ({
  teams,
  title,
  onDragEnd,
  slots: propSlots,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const [slots, setSlots] = useState<(Team | null)[]>([]);
  const [teamList, setTeamList] = useState<Team[]>([]);

  useEffect(() => {
    setSlots(propSlots);
    setTeamList(teams);
  }, [propSlots, teams]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      return;
    }

    const activeId = active.id.toString();
    const overId = over.id.toString();

    const isDraggingTeam = teamList.some((team) => team.id.toString() === activeId);
    const isDraggingFromSlot = slots.some((slot) => slot && slot.id.toString() === activeId);
    const isOverSlot = overId.startsWith("slot-");
    const overSlotIndex = isOverSlot ? parseInt(overId.replace("slot-", ""), 10) : -1;

    let newTeamList = [...teamList];
    let newSlots = [...slots];

    if (isDraggingTeam) {
      const activeTeamIndex = newTeamList.findIndex((team) => team.id.toString() === activeId);
      const activeTeam = newTeamList[activeTeamIndex];

      if (isOverSlot && overSlotIndex >= 0 && newSlots[overSlotIndex] === null) {
        newSlots[overSlotIndex] = activeTeam;
        newTeamList.splice(activeTeamIndex, 1);
      } else {
        const overTeamIndex = newTeamList.findIndex((team) => team.id.toString() === overId);
        if (overTeamIndex !== -1) {
          newTeamList = arrayMove(newTeamList, activeTeamIndex, overTeamIndex);
        }
      }
    } else if (isDraggingFromSlot) {
      const activeSlotIndex = slots.findIndex((slot) => slot && slot.id.toString() === activeId);
      
      if (overId === "teams-container") {
        newTeamList.push(slots[activeSlotIndex]!);
        newSlots[activeSlotIndex] = null;
      } else if (isOverSlot && overSlotIndex >= 0) {
        [newSlots[activeSlotIndex], newSlots[overSlotIndex]] = [
          newSlots[overSlotIndex],
          newSlots[activeSlotIndex],
        ];
      }
    }

    setTeamList([...newTeamList]);
    setSlots([...newSlots]);

    onDragEnd(newTeamList, newSlots);
  };

  return (
    <div className="conference-table">
      <h2>{title}</h2>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className="table-layout">
          {/* Teams Container */}
          <DroppableTeams teams={teamList} />

          {/* Slots Container */}
          <DroppableSlots slots={slots} />
        </div>
      </DndContext>
    </div>
  );
};

// Teams Container (Droppable)
const DroppableTeams: React.FC<{ teams: Team[] }> = ({ teams }) => {
  const { setNodeRef } = useDroppable({ id: "teams-container" });

  return (
    <div ref={setNodeRef} id="teams-container" className="teams-container">
      <h3>Teams</h3>
      <SortableContext
        items={teams.map((team) => team.id.toString())}
        strategy={verticalListSortingStrategy}
      >
        <ul className="teams-list">
          {teams.map((team) => (
            <SortableItem key={team.id} id={team.id} teamName={team.name} logo = {team.logo}/>
          ))}
        </ul>
      </SortableContext>
    </div>
  );
};

// Slots Container (Droppable)
const DroppableSlots: React.FC<{ slots: (Team | null)[] }> = ({ slots }) => {
  return (
    <div className="slots-container">
      <h3>Slots</h3>
      <SortableContext
        items={slots.map((_, index) => `slot-${index}`)}
        strategy={verticalListSortingStrategy}
      >
        <ol className="slots-list">
          {slots.map((slot, index) => (
             <li key={index} className="slot">
            <span className="slot-number">{index + 1}.</span>
            <DroppableSlot key={index} index={index} slot={slot} />
            </li>
          ))}
        </ol>
      </SortableContext>
    </div>
  );
};

// Droppable Slot Component
const DroppableSlot: React.FC<{ index: number; slot: Team | null }> = ({ index, slot }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `slot-${index}`,
  });

  return (
    <li ref={setNodeRef} id={`slot-${index}`} className={`slot ${isOver ? 'droppable-over' : ''}`}>
      {slot ? <SortableItem id={slot.id} teamName={slot.name} logo={slot.logo }/> : <div className="empty-slot">Empty</div>}
    </li>
  );
};

export default ConferenceTable;
