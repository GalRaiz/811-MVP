import React, { useId, useState, ReactNode, KeyboardEvent } from 'react';
import './Tabs.scss';

export interface Tab {
  label: string;
  content: ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  defaultIndex?: number;
  onChange?: (index: number) => void;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultIndex = 0,
  onChange,
  className,
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const baseId = useId();

  const setIndex = (i: number) => {
    setActiveIndex(i);
    onChange?.(i);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const dir = e.key === 'ArrowRight' ? 1 : -1;
    let next = (activeIndex + dir + tabs.length) % tabs.length;
    while (tabs[next]?.disabled) {
      next = (next + dir + tabs.length) % tabs.length;
      if (next === activeIndex) break;
    }
    setIndex(next);
    document.getElementById(`${baseId}-tab-${next}`)?.focus();
  };

  return (
    <div className={`tabs ${className ?? ''}`}>
      <div className="tabs__header" role="tablist" onKeyDown={onKeyDown}>
        {tabs.map((tab, i) => (
          <button
            key={i}
            id={`${baseId}-tab-${i}`}
            className={`tabs__btn ${i === activeIndex ? 'is-active' : ''}`}
            role="tab"
            aria-selected={i === activeIndex}
            aria-controls={`${baseId}-panel-${i}`}
            type="button"
            disabled={tab.disabled}
            onClick={() => !tab.disabled && setIndex(i)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        id={`${baseId}-panel-${activeIndex}`}
        className="tabs__panel"
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${activeIndex}`}
      >
        {tabs[activeIndex].content}
      </div>
    </div>
  );
};

export default Tabs;
