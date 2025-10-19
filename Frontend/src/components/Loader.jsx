const Loader = ({ size = 'medium', fullScreen = false, message = '' }) => {
  const sizes = {
    small: 'h-8 w-8 border-2',
    medium: 'h-12 w-12 border-4',
    large: 'h-16 w-16 border-4',
  };

  const loader = (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`${sizes[size]} border-gray-200 border-t-gray-950 rounded-full animate-spin`}
      ></div>
      {message && <p className="mt-6 text-gray-500 text-lg">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        {loader}
      </div>
    );
  }

  return loader;
};

export default Loader;
