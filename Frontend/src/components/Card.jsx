const Card = ({ children, className = '', onClick, hover = false }) => {
  const hoverClass = hover ? 'hover:shadow-lg transition-shadow duration-200' : '';

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg shadow-md p-6 ${hoverClass} ${className} ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      {children}
    </div>
  );
};

export default Card;
