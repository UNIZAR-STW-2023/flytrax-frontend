import "../styles/app.css";
import "../styles/home.scss";
import { AirportCard, Layout } from "../components";
import { StateContext } from "../context/StateContext";
import { Toaster } from "react-hot-toast";

function Flytrax({ Component, pageProps }) {
  return (
    <main className="App-main">
      <StateContext>
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </StateContext>
    </main>
  );
}

export default Flytrax;
