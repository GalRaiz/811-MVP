// CardGrid.tsx
import './CardGrid.scss';
import EmptyState from '../EmptyState/EmptyState';

interface CardGridProps<T> {
  data: T[];
  renderCard: (item: T) => React.ReactNode;
  onCardClick?: (item: T) => void;
  emptyStateMessage?: string;
  noResultsMessage?: string;
  hasActiveFilters?: boolean;
  layout?: 'grid' | 'list';
  columns?: number;
}

function CardGrid<T extends { id: string | number }>({
  data,
  renderCard,
  onCardClick,
  emptyStateMessage = 'No data available',
  noResultsMessage = 'No results found with current search and filters.',
  hasActiveFilters = false,
  layout = 'grid',
  columns = 3,
}: CardGridProps<T>) {
  if (data.length === 0) {
    return (
      <div className="card-grid">
        <div className="card-grid__empty">
          <EmptyState />
          {hasActiveFilters ? (
            <div className="card-grid__no-results">
              <p>{noResultsMessage}</p>
              <p>Try adjusting your search or filters to see all results.</p>
            </div>
          ) : (
            <div className="card-grid__empty-message">
              <p>{emptyStateMessage}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  const gridClassName = `card-grid card-grid--${layout} card-grid--cols-${columns}`;

  return (
    <div className={gridClassName}>
      {data.map(item => (
        <div 
          key={item.id} 
          className="card-grid__item"
          onClick={() => onCardClick?.(item)}
        >
          {renderCard(item)}
        </div>
      ))}
    </div>
  );
}

export default CardGrid; 
