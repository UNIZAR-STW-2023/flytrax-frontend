import React from "react";
import Head from "next/head";
import { Navbar, Footer } from "../components";

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>Flytrax</title>
      </Head>

      <header>
        <Navbar />
      </header>

      <main className="m-auto w-full">{children}</main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
