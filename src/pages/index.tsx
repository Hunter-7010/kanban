import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "~/utils/api";

import Navbar from "~/components/landing/navbar";
import Hero from "~/components/landing/hero";
import Footer from "~/components/landing/footer";
import Faqs from "~/components/landing/faqs";
import Feature from "~/components/landing/feature";
import Features from "~/components/landing/features";
import Steps from "~/components/landing/steps";

const Landing: NextPage = () => {
  return (
    <>
     <Head>
        <meta name="description" content="Manage your daily tasks" />
       
      </Head>
    <div className="relative bg-gradient-to-b from-[#101212] to-[#08201D] text-white">
      <Navbar />
      <Hero />
      <Feature/>
      <Features/>
      <Steps/>
      <Faqs/>
      <Footer/>
    </div>
    </>
  );
};

export default Landing;
