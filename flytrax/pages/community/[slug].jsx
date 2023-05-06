import React, { useEffect, useState } from "react";
import { ForoFeed, ForoForm } from "../../components";
import { useRouter } from "next/router";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { aeropuertos } from "../../assets/dummy/aeropuertos_iata";

const CommunityDetails = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [airports, setAirports] = useState([]);
  const [actualAirport, setActualAirport] = useState("");
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady) return;
    aeropuertos.map(function (item) {
      if (item.iata_code === slug) {
        setActualAirport(item.iata_code);
        setIsLoading(false);
      }
    });

    const getPosts = async () => {};

    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.slug, router.isReady]);

  return actualAirport.length != 0 ? (
    <div className="max-w-[1400px] m-auto w-full my-24">
      <h3 className="text-3xl font-bold mb-3 text-black">
        Foro del aeropuerto {slug}
      </h3>
      <ForoForm />
      <ForoFeed />
    </div>
  ) : (
    <div className="max-w-[1400px] m-auto w-full my-24 py-20">
      <div className="flex items-center justify-center">
        {!loading ? (
          <div>Este foro no existe</div>
        ) : (
          <ClipLoader
            loading={loading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        )}
      </div>
    </div>
  );
};

export default CommunityDetails;
