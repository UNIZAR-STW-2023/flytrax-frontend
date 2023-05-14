import { getCookie } from "cookies-next";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Home = () => {
  const SESSION_COOKIE = getCookie("sessionToken");
  const ADMIN_COOKIE = getCookie("adminSessionToken");

  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    // Fetch user cookie value
    const sessionCookie = getCookie("sessionToken");
    const adminCookie = getCookie("adminSessionToken");
    // Update state with user cookie value
    setUser(sessionCookie);
    setAdmin(adminCookie);
  }, [user, setUser, admin, setAdmin, SESSION_COOKIE, ADMIN_COOKIE]);

  return (
    <div className="App-header max-sm:pt-24 pt-24">
      <div className="md:px-12 flex flex-col justify-center items-center fade-in select-none">
        <div className="col-span-1 font-bold text-center py-2 home-text text-5xl md:text-6xl">
          Viaja con tranquilidad<span className="text-zinc-800">,</span>
        </div>
        <div className="font-bold text-center text-zinc-800 text-5xl md:text-6xl">
          deja que nosotros hagamos el camino por ti.
        </div>
        <div data-test="join-button">
          <Link
            className="my-10 backdrop-blur-sm drop-shadow-md gradient-btn text-gray-700 border-gray-700 hover:border-gray-50 transition ease-out duration-700 max-sm:text-sm"
            href={user ? "/map" : admin ? "/admin" : "/login"}
          >
            {user ? "Navega ya" : admin ? "Ir al dashboard" : "Únete ahora"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
