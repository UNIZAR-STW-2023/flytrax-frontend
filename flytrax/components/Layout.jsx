import React from "react";
import Head from "next/head";
import { Navbar, Footer } from "../components";

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Flytrax</title>
      </Head>

      <header>
        <Navbar />
      </header>

      <main className="max-w-[1400px] my-24 m-auto w-full">
          {children}
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
