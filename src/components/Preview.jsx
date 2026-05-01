import React from 'react';

const Preview = React.forwardRef(({ data }, ref) => {
  const themeClass = `resume-paper theme-${data.theme}`;

  return (
    <div className={themeClass} ref={ref}>
      {/* Header Section: Profile Information */}
      <header className="preview-header">
        <h1>{data.profile.name || 'Your Full Name'}</h1>
        <p className="subtitle">{data.profile.title || 'Professional Job Title'}</p>
        <p className="contact-info">{data.profile.email || 'your.email@example.com'}</p>
      </header>

      <div className="preview-body">
        {data.sections.map((sec) => (
          <div key={sec.id} className="preview-section">
            <h3>{sec.title || 'Section Heading'}</h3>
            <div className="preview-divider"></div>
            <p className="preview-content">
              {sec.content || 'Your detailed professional points will appear here...'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
});

export default Preview;