import "/styles/app.css";
import "/styles/home.scss";
import "/styles/globals.css";
import { AirportCard, Layout } from "../components";
import { StateContext } from "../context/StateContext";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

function Flytrax({ Component, pageProps, session }) {
  return (
    <main className="App-main">
      <SessionProvider session={session}>
        <StateContext>
          <Layout>
            <Toaster />
            <Component {...pageProps} />
          </Layout>
        </StateContext>
      </SessionProvider>
    </main>
  );
}

export default Flytrax;
