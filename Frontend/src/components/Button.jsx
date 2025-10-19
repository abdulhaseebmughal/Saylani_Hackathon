const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  fullWidth = false,
  className = '',
}) => {
  const baseStyles =
    'px-5 py-2.5 font-normal transition-all duration-150 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'bg-gray-900 text-white hover:bg-gray-800',
    secondary:
      'bg-gray-100 text-gray-900 hover:bg-gray-200',
    success:
      'bg-green-600 text-white hover:bg-green-700',
    danger:
      'bg-red-600 text-white hover:bg-red-700',
    outline:
      'border border-gray-300 text-gray-900 hover:border-gray-400 hover:bg-gray-50',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
