import React from 'react';
import { Draggable } from '@hello-pangea/dnd';

const SectionWrapper = ({ id, index, children }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`section-wrapper ${snapshot.isDragging ? 'dragging' : ''}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps} 
        >
          <div className="section-body">
            {children}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default SectionWrapper;