import React, { useEffect, useState, useMemo } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Add, ArrowUpward, KeyboardDoubleArrowUp } from "@mui/icons-material";
import axios from "axios";
import Loader from "./Loader";

function FlightPanel({ showDepartures, airport }) {
  const fligthsPerPage = 25;
  const [departureFlights, setDepartureFlights] = useState([]);
  const [arrivalFlights, setArrivalFlights] = useState([]);
  const [paginate, setPaginate] = useState(fligthsPerPage);
  const [orderBy, setOrderBy] = useState("asc");
  const [field, setField] = useState("");
  const [loading, setLoading] = useState(true);

  const AirLabs_API_KEY = "02a4e640-3534-45db-a3dd-186c1c5a9325";
  const AirLabs_URL_dep = `https://airlabs.co/api/v9/schedules?dep_iata=${airport}&api_key=${AirLabs_API_KEY}`;
  const AirLabs_URL_arr = `https://airlabs.co/api/v9/schedules?arr_iata=${airport}&api_key=${AirLabs_API_KEY}`;

  useEffect(() => {
    const getDepartureFlights = async () => {
      await axios
        .get(AirLabs_URL_dep)
        .then((response) => {
          setDepartureFlights(response.data.response);
        })
        .catch((error) => {
          console.log("Error fetching the data: ", error);
        });

      /* await fetch("../assets/data/[AirLabs]_Flights_BCN.json")
        .then((response) => response.json())
        .then((data) => {
          vuelos = data.response;
          setDepartureFlights(data.response);
        })
        .catch((error) => console.error(error)); */
    };

    const getArrivalFlights = async () => {
      await axios
        .get(AirLabs_URL_arr)
        .then((response) => {
          setArrivalFlights(response.data.response);
        })
        .catch((error) => {
          console.log("Error fetching the data: ", error);
        });

      /* await fetch("../assets/data/[AirLabs]_Flights_arr_BCN.json")
        .then((response) => response.json())
        .then((data) => {
          vuelos = data.response;
          setArrivalFlights(data.response);
        })
        .catch((error) => console.error(error)); */
    };

    /* getCountryFromLocation(); */
    getDepartureFlights();
    getArrivalFlights();
    /* setTimeout(() => setLoading(false), 1500); */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setTimeout(() => setLoading(false), 1500);
  }, []);

  // Función para cargar más aeropuertos
  const loadMore = () => {
    setPaginate((prevValue) => prevValue + fligthsPerPage);
  };

  // Función para volver al principio de la página
  const scrollToTop = () => {
    const element = document.getElementById("table-top");
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  const sortFlights = (array, param, orderBy, setArray, setOrderBy) => {
    const sortedArray = [...array].sort((a, b) => {
      if (a[param] === null) return -1;
      if (b[param] === null) return 1;
      return a[param] < b[param] ? -1 : 1;
    });

    setArray(orderBy === "asc" ? sortedArray : sortedArray.reverse());
    setOrderBy(orderBy === "asc" ? "desc" : "asc");
    setField(param);
  };

  return !loading ? (
    <TableContainer
      sx={{
        height: "70vh",
        background: "linear-gradient(220.55deg, #FFF6E4 0%, #8B9DA9 100%)",
      }}
      component={Paper}
    >
      <Table
        stickyHeader
        className="bg-gray-700"
        sx={{ minWidth: 350 }}
        size="small"
        aria-label="a dense table"
      >
        <TableHead id="table-top">
          <TableRow className="uppercase">
            <TableCell
              className="w-1/6 text-yellow-400 font-bold cursor-pointer hover:bg-gray-700 transition ease-in-out duration-200"
              sx={{
                backgroundColor: "#111827",
                fontFamily: "PressStart2P-Regular",
              }}
              align="left"
              onClick={() =>
                sortFlights(
                  showDepartures ? departureFlights : arrivalFlights,
                  showDepartures ? "dep_time_utc" : "arr_time_utc",
                  orderBy,
                  showDepartures ? setDepartureFlights : setArrivalFlights,
                  setOrderBy
                )
              }
            >
              <div className="flex align-middle items-center flight-panel-head">
                Hora
                <ArrowUpward
                  fontSize="medium"
                  className={`${
                    orderBy === "asc"
                      ? "text-orange-400  -rotate-180 transition duration-300"
                      : "text-teal-400 rotate-0 transition duration-300"
                  } ${
                    field === "dep_time_utc" || field === "arr_time_utc"
                      ? "block"
                      : "hidden"
                  }`}
                />
              </div>
            </TableCell>
            <TableCell
              className="w-1/6 text-yellow-400 font-bold cursor-pointer hover:bg-gray-700 transition ease-in-out duration-200"
              sx={{
                backgroundColor: "#111827",
                fontFamily: "PressStart2P-Regular",
              }}
              align="left"
              onClick={() =>
                sortFlights(
                  showDepartures ? departureFlights : arrivalFlights,
                  "flight_iata",
                  orderBy,
                  showDepartures ? setDepartureFlights : setArrivalFlights,
                  setOrderBy
                )
              }
            >
              <div className="flex align-middle items-center flight-panel-head">
                Vuelo
                <ArrowUpward
                  fontSize="medium"
                  className={`${
                    orderBy === "asc"
                      ? "text-orange-400  -rotate-180 transition duration-300"
                      : "text-teal-400 rotate-0 transition duration-300"
                  } ${field === "flight_iata" ? "block" : "hidden"}`}
                />
              </div>
            </TableCell>
            <TableCell
              className="w-1/6 text-yellow-400 font-bold cursor-pointer hover:bg-gray-700 transition ease-in-out duration-200"
              sx={{
                backgroundColor: "#111827",
                fontFamily: "PressStart2P-Regular",
              }}
              align="left"
              onClick={() =>
                sortFlights(
                  showDepartures ? departureFlights : arrivalFlights,
                  showDepartures ? "arr_iata" : "dep_iata",
                  orderBy,
                  showDepartures ? setDepartureFlights : setArrivalFlights,
                  setOrderBy
                )
              }
            >
              <div className="flex align-middle items-center flight-panel-head">
                {showDepartures ? "Destino" : "Origen"}
                <ArrowUpward
                  fontSize="medium"
                  className={`${
                    orderBy === "asc"
                      ? "text-orange-400  -rotate-180 transition duration-300"
                      : "text-teal-400 rotate-0 transition duration-300"
                  } ${
                    field === "dep_iata" || field === "arr_iata"
                      ? "block"
                      : "hidden"
                  }`}
                />
              </div>
            </TableCell>
            <TableCell
              className="w-1/6 text-yellow-400 font-bold cursor-pointer hover:bg-gray-700 transition ease-in-out duration-200"
              sx={{
                backgroundColor: "#111827",
                fontFamily: "PressStart2P-Regular",
              }}
              align="left"
              onClick={() =>
                sortFlights(
                  showDepartures ? departureFlights : arrivalFlights,
                  showDepartures ? "dep_terminal" : "arr_terminal",
                  orderBy,
                  showDepartures ? setDepartureFlights : setArrivalFlights,
                  setOrderBy
                )
              }
            >
              <div className="flex align-middle items-center flight-panel-head">
                Terminal
                <ArrowUpward
                  fontSize="medium"
                  className={`${
                    orderBy === "asc"
                      ? "text-orange-400  -rotate-180 transition duration-300"
                      : "text-teal-400 rotate-0 transition duration-300"
                  } ${
                    field === "dep_terminal" || field === "arr_terminal"
                      ? "block"
                      : "hidden"
                  }`}
                />
              </div>
            </TableCell>
            <TableCell
              className="w-1/6 text-yellow-400 font-bold cursor-pointer hover:bg-gray-700 transition ease-in-out duration-200"
              sx={{
                backgroundColor: "#111827",
                fontFamily: "PressStart2P-Regular",
              }}
              align="left"
              onClick={() =>
                sortFlights(
                  showDepartures ? departureFlights : arrivalFlights,
                  showDepartures ? "dep_gate" : "arr_gate",
                  orderBy,
                  showDepartures ? setDepartureFlights : setArrivalFlights,
                  setOrderBy
                )
              }
            >
              <div className="flex align-middle items-center flight-panel-head">
                Puerta
                <ArrowUpward
                  fontSize="medium"
                  className={`${
                    orderBy === "asc"
                      ? "text-orange-400  -rotate-180 transition duration-300"
                      : "text-teal-400 rotate-0 transition duration-300"
                  } ${
                    field === "dep_gate" || field === "arr_gate"
                      ? "block"
                      : "hidden"
                  }`}
                />
              </div>
            </TableCell>
            <TableCell
              className="w-1/6 text-yellow-400 font-bold cursor-pointer hover:bg-gray-700 transition ease-in-out duration-200"
              sx={{
                backgroundColor: "#111827",
                fontFamily: "PressStart2P-Regular",
              }}
              align="left"
              onClick={() =>
                sortFlights(
                  showDepartures ? departureFlights : arrivalFlights,
                  "status",
                  orderBy,
                  showDepartures ? setDepartureFlights : setArrivalFlights,
                  setOrderBy
                )
              }
            >
              <div className="flex align-middle items-center flight-panel-head">
                Estado
                <ArrowUpward
                  fontSize="medium"
                  className={`${
                    orderBy === "asc"
                      ? "text-orange-400  -rotate-180 transition duration-300"
                      : "text-teal-400 rotate-0 transition duration-300"
                  } ${field === "status" ? "block" : "hidden"}`}
                />
              </div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {showDepartures
            ? departureFlights.slice(0, paginate).map((row) => (
                <TableRow
                  key={row.iata_code}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    className="text-yellow-400"
                    component="th"
                    scope="row"
                    sx={{ fontFamily: "PressStart2P-Regular" }}
                  >
                    {row.dep_time_utc.split(" ")[1]}
                  </TableCell>
                  <TableCell
                    className="text-slate-50"
                    align="left"
                    sx={{ fontFamily: "PressStart2P-Regular" }}
                  >
                    {row.flight_iata}
                  </TableCell>
                  <TableCell
                    className="text-slate-50"
                    align="left"
                    sx={{ fontFamily: "PressStart2P-Regular" }}
                  >
                    {row.arr_iata}
                  </TableCell>
                  <TableCell
                    className="text-slate-50"
                    align="left"
                    sx={{ fontFamily: "PressStart2P-Regular" }}
                  >
                    {row.dep_terminal}
                  </TableCell>
                  <TableCell
                    className="text-yellow-400"
                    align="left"
                    sx={{ fontFamily: "PressStart2P-Regular" }}
                  >
                    {row.dep_gate}
                  </TableCell>
                  <TableCell
                    className={`uppercase ${
                      row.status === "active"
                        ? "text-cyan-400"
                        : row.status === "cancelled"
                        ? "text-red-500"
                        : row.status === "landed"
                        ? "text-green-500"
                        : "text-slate-50"
                    }`}
                    align="left"
                    sx={{ fontFamily: "PressStart2P-Regular" }}
                  >
                    {row.status === "active"
                      ? "Activo"
                      : row.status === "cancelled"
                      ? "Cancelado"
                      : row.status === "landed"
                      ? "Aterrizado"
                      : "Programado"}
                  </TableCell>
                </TableRow>
              ))
            : arrivalFlights.slice(0, paginate).map((row) => (
                <TableRow
                  key={row.iata_code}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    className="text-yellow-400"
                    component="th"
                    scope="row"
                    sx={{ fontFamily: "PressStart2P-Regular" }}
                  >
                    {row.arr_time_utc.split(" ")[1]}
                  </TableCell>
                  <TableCell
                    className="text-slate-50"
                    align="left"
                    sx={{ fontFamily: "PressStart2P-Regular" }}
                  >
                    {row.flight_iata}
                  </TableCell>
                  <TableCell
                    className="text-slate-50"
                    align="left"
                    sx={{ fontFamily: "PressStart2P-Regular" }}
                  >
                    {row.dep_iata}
                  </TableCell>
                  <TableCell
                    className="text-slate-50"
                    align="left"
                    sx={{ fontFamily: "PressStart2P-Regular" }}
                  >
                    {row.arr_terminal}
                  </TableCell>
                  <TableCell
                    className="text-yellow-400"
                    align="left"
                    sx={{ fontFamily: "PressStart2P-Regular" }}
                  >
                    {row.arr_gate}
                  </TableCell>
                  <TableCell
                    className={`uppercase ${
                      row.status === "active"
                        ? "text-cyan-400"
                        : row.status === "cancelled"
                        ? "text-red-500"
                        : row.status === "landed"
                        ? "text-green-500"
                        : "text-slate-50"
                    }`}
                    align="left"
                    sx={{ fontFamily: "PressStart2P-Regular" }}
                  >
                    {row.status === "active"
                      ? "Activo"
                      : row.status === "cancelled"
                      ? "Cancelado"
                      : row.status === "landed"
                      ? "Aterrizado"
                      : "Programado"}
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
      {paginate < departureFlights?.length && (
        <div className="flex">
          <button
            data-test="more-button"
            type="button"
            className="flex pl-10 bg-slate-300 align-middle items-center w-full justify-center py-4 text-xl uppercase font-bold text-slate-800 hover:text-cyan-600 transition ease-in-out duration-200"
            onClick={loadMore}
          >
            <Add /> <h2>Ver más</h2>
          </button>
          <button
            data-test="more-button"
            type="button"
            className="flex px-3 sm:px-5 bg-slate-300 align-middle items-center w-fit justify-center py-4 text-xl uppercase font-bold text-slate-800 hover:text-cyan-600 transition ease-in-out duration-200"
            onClick={scrollToTop}
          >
            <KeyboardDoubleArrowUp />
          </button>
        </div>
      )}
    </TableContainer>
  ) : (
    <Loader />
  );
}

export default FlightPanel;
