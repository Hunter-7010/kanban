import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "~/utils/api";

import Navbar from "~/components/navbar";
import Hero from "~/components/hero";
import Footer from "~/components/footer";
import Faqs from "~/components/faqs";
import Feature from "~/components/feature";
import Features from "~/components/features";
import Steps from "~/components/steps";

const Landing: NextPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="dark relative bg-gradient-to-b from-[#101212] to-[#08201D] text-white">
      <Navbar />
      <Hero />
      <Feature/>
      <Features/>
      <Steps/>
      <Faqs/>
      <Footer/>
    </div>
  );
};

export default Landing;
