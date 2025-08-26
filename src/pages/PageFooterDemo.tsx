import React, { useState } from 'react';
import PageFooter from '../components/storybook/NavBar/PageFooter';
import PageHeader from '../components/storybook/NavBar/PageHeader';
import Button from '../components/storybook/Button/Button';
import './PageFooterDemo.scss';

const PageFooterDemo: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [progress, setProgress] = useState(3);
  const totalPages = 10;
  const totalProgress = 5;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleProgressChange = () => {
    setProgress(prev => (prev >= totalProgress ? 1 : prev + 1));
  };

  return (
    <div className="page-footer-demo">
      <PageHeader title="PageFooter Demo" />
      
      <div className="page-footer-demo__content">
        <h2>PageFooter Component Demo</h2>
        <p>This page demonstrates all the features of the PageFooter component:</p>
        
        <div className="page-footer-demo__sections">
          <section>
            <h3>Features:</h3>
            <ul>
              <li>📝 Text display</li>
              <li>🔘 Action buttons</li>
              <li>📊 Progress bar with percentage</li>
              <li>📄 Smart pagination with ellipsis</li>
              <li>📱 Responsive design</li>
              <li>🌐 RTL support</li>
            </ul>
          </section>

          <section>
            <h3>Controls:</h3>
            <div className="page-footer-demo__controls">
              <Button
                type="primary"
                size="medium"
                btnText="Change Progress"
                onClick={handleProgressChange}
              />
              <Button
                type="secondary"
                size="medium"
                btnText="Go to Page 5"
                onClick={() => setCurrentPage(5)}
              />
            </div>
          </section>

          <section>
            <h3>Current State:</h3>
            <p>Progress: {progress} / {totalProgress}</p>
            <p>Page: {currentPage} / {totalPages}</p>
          </section>
        </div>

        {/* Add some content to make the page scrollable */}
        <div className="page-footer-demo__spacer">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="page-footer-demo__spacer-item">
              Content section {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* PageFooter with all features */}
      <PageFooter
        text="Showing page {currentPage} of {totalPages} - Total items: 150"
        progress={{
          current: progress,
          total: totalProgress,
          showLabels: true,
          showPercentage: true,
          size: 'medium'
        }}
        pagination={{
          currentPage,
          totalPages,
          onPageChange: handlePageChange,
          showPageNumbers: true
        }}
        buttons={[
          {
            type: 'primary',
            size: 'medium',
            btnText: 'שמור',
            onClick: () => alert('Saved!'),
            icon: '✅'
          },
          {
            type: 'secondary',
            size: 'medium',
            btnText: 'ביטול',
            onClick: () => alert('Cancelled!'),
            icon: '❌'
          }
        ]}
      />
    </div>
  );
};

export default PageFooterDemo;
