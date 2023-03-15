const Steps = () => {
  return (
    <section className="relative py-10 sm:py-16 lg:py-24">
      <div className="absolute bottom-0 w-full hidden md:block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1921 531"
          xmlSpace="preserve"
          className="fill-teal-900"
        >
          <path className="" d="M1921 0v531H0l1-416c109.65 95.78 263.84 197.12 420 165 123.13-25.33 146.19-112.79 288-169 182.97-72.52 318.11 4.31 522 27 159 17.69 390.56 5.87 690-138z"></path>
        </svg>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            How does it work?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-teal-600 opacity-60">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis.
          </p>
        </div>

        <div className="relative mt-12 lg:mt-20">
          <div className="absolute inset-x-0 top-2 hidden md:block md:px-20 lg:px-28 xl:px-44">
            <img
              className="w-full"
              src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg"
              alt=""
            />
          </div>

          <div className="relative grid grid-cols-1 gap-y-12 gap-x-12 text-center md:grid-cols-3">
            <div>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-teal-200 bg-white shadow">
                <span className="text-xl font-semibold text-teal-700"> 1 </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold leading-tight md:mt-10">
                Create a free account
              </h3>
              <p className="mt-4 text-base text-teal-600 opacity-60">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis enim velit mollit.
              </p>
            </div>
            <div>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-teal-200 bg-white shadow">
                <span className="text-xl font-semibold text-teal-700"> 2 </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold leading-tight md:mt-10">
                Build your website
              </h3>
              <p className="mt-4 text-base text-teal-600 opacity-60">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis enim velit mollit.
              </p>
            </div>

            <div>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-teal-200 bg-white shadow">
                <span className="text-xl font-semibold text-teal-700"> 3 </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold leading-tight md:mt-10">
                Release & Launch
              </h3>
              <p className="mt-4 text-base text-teal-600 opacity-60">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis enim velit mollit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Steps;
