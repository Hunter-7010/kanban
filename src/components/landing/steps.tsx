const Steps = () => {
  return (
    <section className="relative py-10 sm:py-16 lg:py-24">
      <div className="absolute bottom-0 hidden w-full md:block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1921 531"
          xmlSpace="preserve"
          className="fill-teal-900"
        >
          <path
            className=""
            d="M1921 0v531H0l1-416c109.65 95.78 263.84 197.12 420 165 123.13-25.33 146.19-112.79 288-169 182.97-72.52 318.11 4.31 522 27 159 17.69 390.56 5.87 690-138z"
          ></path>
        </svg>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            How does it work?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-teal-600 opacity-60">
            Start using our task management platform by logging in with your
            Google account or downloading our mobile app for iOS and Android.
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
                Get Started with Google Login
              </h3>
              <p className="mt-4 text-base text-teal-600 opacity-60">
                Log in with your Google account and start using our task
                management app today, for a simple and hassle-free experience.
              </p>
            </div>
            <div>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-teal-200 bg-white shadow">
                <span className="text-xl font-semibold text-teal-700"> 2 </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold leading-tight md:mt-10">
                Download Our App and Stay Productive On-the-Go
              </h3>
              <p className="mt-4 text-base text-teal-600 opacity-60">
                Download our task management app on iOS and Android and stay
                productive on-the-go, with all the features of our website at
                your fingertips.
              </p>
            </div>

            <div>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-teal-200 bg-white shadow">
                <span className="text-xl font-semibold text-teal-700"> 3 </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold leading-tight md:mt-10">
                Start using our app
              </h3>
              <p className="mt-4 text-base text-teal-600 opacity-60">
                You're good to go to start using our user-friendly task
                management app.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Steps;
