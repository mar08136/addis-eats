function DishSkeleton() {
  return (
    <article className="dish-card skeleton-card">
      <div className="skeleton skeleton-image"></div>

      <div className="dish-content">
        <div className="dish-top">
          <div className="skeleton skeleton-category"></div>
          <div className="skeleton skeleton-rating"></div>
        </div>

        <div className="skeleton skeleton-title"></div>

        <div className="skeleton skeleton-description"></div>
        <div className="skeleton skeleton-description short"></div>

        <div className="dish-footer">
          <div className="skeleton skeleton-price"></div>
          <div className="skeleton skeleton-button"></div>
        </div>
      </div>
    </article>
  );
}

export default DishSkeleton;