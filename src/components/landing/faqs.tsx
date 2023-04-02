import { signIn } from "next-auth/react";

const Faqs = () => {
  return (
    <section className="py-10 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Questions & Answers
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-300">
            Explore the common questions and answers
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-y-16 gap-x-20 md:mt-20 md:grid-cols-2">
          <div className="flex items-start">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-700">
              <span className="text-lg font-semibold text-white">?</span>
            </div>
            <div className="ml-4">
              <p className="text-xl font-semibold text-white">
                How to Login to an account?
              </p>
              <p className="mt-4 text-base text-gray-400">
                By simply pressing{" "}
                <a
                  onClick={() => void signIn("google")}
                  className="cursor-pointer text-teal-300 transition-all duration-200 hover:text-teal-400 hover:underline focus:text-teal-400"
                >
                  Login
                </a>{" "}
                you will be redirected to google sign in{" "}
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-700">
              <span className="text-lg font-semibold text-white">?</span>
            </div>
            <div className="ml-4">
              <p className="text-xl font-semibold text-white">
                How can I get it on IOS?
              </p>
              <p className="mt-4 text-base text-gray-400">
                Visit the website in safar then click the share button then add
                the website to homepage
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-700">
              <span className="text-lg font-semibold text-white">?</span>
            </div>
            <div className="ml-4">
              <p className="text-xl font-semibold text-white">
                How can I get it on Andriod?
              </p>
              <p className="mt-4 text-base text-gray-400">
                Visit the website then click the Add page to button then press
                Home screen button
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-700">
              <span className="text-lg font-semibold text-white">?</span>
            </div>
            <div className="ml-4">
              <p className="text-xl font-semibold text-white">
                How do you provide support?
              </p>
              <p className="mt-4 text-base text-gray-400">
                If you have any questions visit my{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://zakiorya.vercel.app/"
                  className="cursor-pointer text-teal-300 transition-all duration-200 hover:text-teal-400 hover:underline focus:text-teal-400"
                >
                  Portfolio
                </a>{" "}
                and contact me
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center md:mt-20">
          <div className="rounded-full bg-gray-800 px-8 py-4 text-center">
            <p className="text-gray-50">
              Didn’t find the answer you are looking for?{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://zakiorya.vercel.app/"
                title="author portfolio page"
                className="text-teal-300 transition-all duration-200 hover:text-teal-400 hover:underline focus:text-teal-400"
              >
                Contact author
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faqs;
