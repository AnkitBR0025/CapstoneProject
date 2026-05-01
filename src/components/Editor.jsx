import React from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import SectionWrapper from './SectionWrapper';

const Editor = ({ data, setData }) => {
  const updateProfile = (e) => {
    setData({ ...data, profile: { ...data.profile, [e.target.name]: e.target.value } });
  };

  const updateSection = (id, field, value) => {
    const updated = data.sections.map(s => s.id === id ? { ...s, [field]: value } : s);
    setData({ ...data, sections: updated });
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(data.sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setData({ ...data, sections: items });
  };

  return (
    <div className="editor-panel">
      <div className="edit-group">
        <h3>PERSONAL DETAILS</h3>

        <label style={{ fontWeight: 'bold',color: '#243041', marginLeft: '12px', display: 'block', marginBottom: '8px' }}>Full Name</label>
        <input name="name" placeholder="Type your full name here..." value={data.profile.name} onChange={updateProfile} />

        <label style={{ fontWeight: 'bold',color: '#283341', marginLeft: '12px', display: 'block', marginBottom: '8px' }}>Professional Title</label>
        <input name="title" placeholder="Professional Title (e.g. Developer)" value={data.profile.title} onChange={updateProfile} />

        <label style={{ fontWeight: 'bold',color: '#293543', marginLeft: '12px', display: 'block', marginBottom: '8px' }}>Email Address</label>
        <input name="email" placeholder="example@gmail.com" value={data.profile.email} onChange={updateProfile} />
      </div>

      <div className="edit-group">
        <h3>RESUME CONTENT</h3>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="sections-list">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {data.sections.map((sec, index) => (
                  <SectionWrapper key={sec.id} id={sec.id} index={index}>
                    <div className="section-form-item">
                      <label style={{ fontWeight: 'bold',color: '#243041', marginLeft: '12px', display: 'block' ,marginBottom: '8px' }}>Add Experience</label>
                      <input
                        value={sec.title}
                        placeholder="e.g. Work Experience"
                        onChange={(e) => updateSection(sec.id, 'title', e.target.value)}
                      />
                      <label style={{ fontWeight: 'bold',color: '#243041', marginLeft: '12px', display: 'block' ,marginBottom: '8px' }}>Details / Descriptions</label>
                      <textarea
                        rows="5"
                        value={sec.content}
                        placeholder="Describe your achievements..."
                        onChange={(e) => updateSection(sec.id, 'content', e.target.value)}
                      />
                    </div>
                  </SectionWrapper>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default Editor;