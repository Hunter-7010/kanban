import { useState } from "react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Link as Scroll } from "react-scroll";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { data: sessionData } = useSession();
  return (
    <nav className="rounded border-gray-200 bg-transparent px-2 py-2.5 sm:px-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <h1 className="flex items-center">
          <span className="self-center whitespace-nowrap text-3xl font-semibold text-white">
            Kanban
          </span>
        </h1>
        <div className="sm:ml-auto md:order-last lg:flex lg:items-center lg:justify-end lg:space-x-6">
          <a
            title="Login with google"
            className="hidden cursor-pointer text-base text-white transition-all duration-200 hover:text-opacity-80 lg:inline-flex"
            onClick={
              sessionData ? () => void signOut() : () => void signIn("google")
            }
          >
            {" "}
            {sessionData ? "Log out" : "Log in"}
          </a>
          {sessionData && (
            <Link href="/home">
              <span
                title=""
                className="inline-flex items-center justify-center rounded-lg bg-white/20 px-3 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/40 focus:bg-white/40 sm:px-5 sm:text-base"
                role="button"
              >
                {" "}
                Dashboard{" "}
              </span>
            </Link>
          )}
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
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-700 bg-gradient-to-l from-[#101212] to-[#08201D] p-4 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:from-transparent md:text-sm md:font-medium lg:ml-10">
            <li>
              <Scroll
                activeClass="active"
                spy={true}
                smooth
                offset={-70}
                duration={500}
                to="feature"
                className="block cursor-pointer rounded py-2 pl-3  pr-4 text-gray-400 hover:bg-gray-700 hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-white"
                aria-current="page"
              >
                Feature
              </Scroll>
            </li>

            <li>
              <Scroll
                activeClass="active"
                spy={true}
                smooth
                offset={-70}
                duration={500}
                to="perks"
                className="block cursor-pointer rounded py-2 pl-3  pr-4 text-gray-400 hover:bg-gray-700 hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-white"
                aria-current="page"
              >
                Perks
              </Scroll>
            </li>
            <li>
              <Scroll
                activeClass="active"
                spy={true}
                smooth
                offset={-70}
                duration={500}
                to="faqs"
                className="block cursor-pointer rounded py-2 pl-3  pr-4 text-gray-400 hover:bg-gray-700 hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-white"
                aria-current="page"
              >
                Faqs
              </Scroll>
            </li>

            <li>
              <Scroll
                activeClass="active"
                spy={true}
                smooth
                offset={-70}
                duration={500}
                to="contact"
                className="block cursor-pointer rounded py-2 pl-3  pr-4 text-gray-400 hover:bg-gray-700 hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-white"
                aria-current="page"
              >
                Contact
              </Scroll>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
