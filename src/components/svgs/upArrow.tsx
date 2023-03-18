function UpArrow() {
  return (
    <div className="hover:bg-gray-300 rounded-full flex justify-center items-center duration-300">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-5 w-4 hover:text-white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 15.75l7.5-7.5 7.5 7.5"
        />
      </svg>
    </div>
  );
}

export default UpArrow;
