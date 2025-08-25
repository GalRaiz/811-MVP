import noResults from '../../../assets/readingDog.png';
import './EmptyState.scss';

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
}

function EmptyState({ title, subtitle }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <img src={noResults} className="empty-state__logo" alt="logo" />
      <h2 className="empty-state__title">{title || 'Empty State'}</h2>
      <p className="empty-state__text">
        {subtitle || "Sorry, we didn't find what you want"}
      </p>
    </div>
  );
}

export default EmptyState;
