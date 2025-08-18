import React, { useState, useRef, useEffect } from "react";
import "./CollapsibleSection.scss";

interface CollapsibleSectionProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
  }

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const [contentHeight, setContentHeight] = useState<number | undefined>(undefined);
    const contentRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      if (contentRef.current) {
        const height = contentRef.current.scrollHeight;
        setContentHeight(height);
      }
    }, [children]);
  
    return (
      <div className="collapsible-section">
        <button 
          className="collapsible-section__header" 
          onClick={() => setIsOpen(!isOpen)}
          type="button"
        >
          <span className="collapsible-section__title">{title}</span>
          <span className={`collapsible-section__arrow ${isOpen ? 'collapsible-section__arrow--open' : ''}`}>
            ▼
          </span>
        </button>
        <div 
          className="collapsible-section__content"
          style={{
            height: isOpen ? `${contentHeight}px` : '0px',
            overflow: 'hidden',
            transition: 'height 0.3s ease'
          }}
        >
          <div ref={contentRef}>
            {children}
          </div>
        </div>
      </div>
    );
  };

  export default CollapsibleSection;