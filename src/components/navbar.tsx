import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="rounded border-gray-200 px-2 py-2.5 dark:bg-transparent sm:px-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <h1 className="flex items-center">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            <img
              className="h-8 w-auto"
              src="https://cdn.rareblocks.xyz/collection/celebration/images/hero/5/logo.svg"
              alt=""
            />
          </span>
        </h1>
        <div className="sm:ml-auto md:order-last lg:flex lg:items-center lg:justify-end lg:space-x-6">
          <a
            href="#"
            title=""
            className="hidden text-base text-white transition-all duration-200 hover:text-opacity-80 lg:inline-flex"
          >
            {" "}
            Log in{" "}
          </a>

          <a
            href="#"
            title=""
            className="inline-flex items-center justify-center rounded-lg bg-white/20 px-3 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/40 focus:bg-white/40 sm:px-5 sm:text-base"
            role="button"
          >
            {" "}
            Apply for free{" "}
          </a>
        </div>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="ml-1 flex h-14 w-14 items-center justify-center rounded-md p-2 text-white transition-all duration-200 hover:bg-gray-800 sm:ml-4 md:hidden"
        >
          {/* <!-- Menu open: "hidden", Menu closed: "block" --> */}
          <svg
            className={`${open ? "hidden" : "block"} h-6 w-6`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M4 6h16M4 12h16m-7 6h7" />
          </svg>

          {/* <!-- Menu open: "block", Menu closed: "hidden" --> */}
          <svg
            className={`${open ? "block" : "hidden"} h-6 w-6`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <div
          className={`${open ? "block" : "hidden"} w-full md:block md:w-auto`}
        >
          <ul className="mt-4 flex flex-col rounded-lg border p-4 dark:border-gray-700 dark:bg-gradient-to-l dark:from-[#101212] dark:to-[#08201D] md:mt-0 md:flex-row md:space-x-8 md:border-0 md:text-sm md:font-medium md:dark:from-transparent">
            <li>
              <a
                href="#"
                className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-white"
                aria-current="page"
              >
                Intro
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-white"
              >
                About
              </a>
            </li>

            <li>
              <a
                href="#experience"
                className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-white"
              >
                Journey
              </a>
            </li>
            <li>
              <a
                href="#skills"
                className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-white"
              >
                Skills
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-white"
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-white"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

       
      </div>
    </nav>
  );
};

export default Navbar;
