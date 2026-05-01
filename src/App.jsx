import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Editor from './components/Editor';
import Preview from './components/Preview';
import './App.css';

const App = () => {
  const [resumeData, setResumeData] = useState({
    profile: { name: '', title: '', email: '' },
    sections: [{ id: '1', title: '', content: '' }],
    theme: 'modern',
  });

  const [showPreview, setShowPreview] = useState(false);
  const componentRef = useRef(null); 

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `${resumeData.profile.name || 'Resume'}_Download`,
    onAfterPrint: () => console.log("Print finished"),
  });

  return (
    <div className={`app-container theme-${resumeData.theme}`}>
      <nav className="navbar">
        <div className="logo">ProResume <span>Builder</span></div>
        <div className="nav-actions">
          <div className="select-wrapper">
            <select
              className="theme-select"
              value={resumeData.theme}
              onChange={(e) => setResumeData({ ...resumeData, theme: e.target.value })}
            >
              <option value="modern">Modern Blue</option>
              <option value="minimal">Minimalist Black</option>
              <option value="classic">Classic Corporate</option>
            </select>
          </div>
          <button onClick={() => setShowPreview(true)} className="preview-btn">Preview Resume</button>
          <button onClick={() => handlePrint()} className="download-btn">Download PDF</button>
        </div>
      </nav>

     
      <div style={{ display: 'none' }}>
        <Preview ref={componentRef} data={resumeData} />
      </div>

      <div className="builder-main">
        <div className="editor-container">
          <Editor data={resumeData} setData={setResumeData} />
        </div>
      </div>

      {showPreview && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Live Preview</h3>
              <button className="close-btn" onClick={() => setShowPreview(false)}>✕ Close</button>
            </div>
            <div className="modal-body">
              {/* This one is just for the user to look at */}
              <Preview data={resumeData} /> 
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;