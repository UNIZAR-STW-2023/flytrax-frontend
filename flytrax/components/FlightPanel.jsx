import React, { useEffect, useState, useMemo } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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

  const AirLabs_API_KEY = process.env.NEXT_PUBLIC_AIRLABS_API_KEY;
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
    };

    getDepartureFlights();
    getArrivalFlights();
    /* setTimeout(() => setLoading(false), 1500); */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setTimeout(() => setLoading(false), 1500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <TableRow sx={{ textTransform: "uppercase" }}>
            <TableCell
              sx={{
                width: "16.666666667%", // Equivalent to w-1/6
                color: "#facc15", // Equivalent to text-yellow-400
                fontWeight: "bold", // Equivalent to font-bold
                cursor: "pointer", // Equivalent to cursor-pointer
                transition: "background-color 200ms ease-in-out", // Equivalent to transition ease-in-out duration-200
                "&:hover": {
                  // Equivalent to hover:bg-gray-700
                  backgroundColor: "#374151",
                },
                backgroundColor: "#111827",
                fontFamily: "PressStart2P-Regular",
              }}
              align="left"
              onClick={() =>
                sortFlights(
                  showDepartures ? departureFlights : arrivalFlights,
                  showDepartures ? "dep_time" : "arr_time",
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
                  sx={{
                    color: orderBy === "asc" ? "#ff9800" : "#4db6ac",
                    transform:
                      orderBy === "asc" ? "rotate(-180deg)" : "rotate(0deg)",
                    transition: "color 300ms, transform 300ms",
                    display:
                      field === "dep_time" || field === "arr_time"
                        ? "block"
                        : "none",
                  }}
                />
              </div>
            </TableCell>
            <TableCell
              sx={{
                width: "16.666666667%", // Equivalent to w-1/6
                color: "#facc15", // Equivalent to text-yellow-400
                fontWeight: "bold", // Equivalent to font-bold
                cursor: "pointer", // Equivalent to cursor-pointer
                transition: "background-color 200ms ease-in-out", // Equivalent to transition ease-in-out duration-200
                "&:hover": {
                  // Equivalent to hover:bg-gray-700
                  backgroundColor: "#374151",
                },
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
                  sx={{
                    color: orderBy === "asc" ? "#ff9800" : "#4db6ac",
                    transform:
                      orderBy === "asc" ? "rotate(-180deg)" : "rotate(0deg)",
                    transition: "color 300ms, transform 300ms",
                    display: field === "flight_iata" ? "block" : "none",
                  }}
                />
              </div>
            </TableCell>
            <TableCell
              sx={{
                width: "16.666666667%", // Equivalent to w-1/6
                color: "#facc15", // Equivalent to text-yellow-400
                fontWeight: "bold", // Equivalent to font-bold
                cursor: "pointer", // Equivalent to cursor-pointer
                transition: "background-color 200ms ease-in-out", // Equivalent to transition ease-in-out duration-200
                "&:hover": {
                  // Equivalent to hover:bg-gray-700
                  backgroundColor: "#374151",
                },
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
                  sx={{
                    color: orderBy === "asc" ? "#ff9800" : "#4db6ac",
                    transform:
                      orderBy === "asc" ? "rotate(-180deg)" : "rotate(0deg)",
                    transition: "color 300ms, transform 300ms",
                    display:
                      field === "dep_iata" || field === "arr_iata"
                        ? "block"
                        : "none",
                  }}
                />
              </div>
            </TableCell>
            <TableCell
              sx={{
                width: "16.666666667%", // Equivalent to w-1/6
                color: "#facc15", // Equivalent to text-yellow-400
                fontWeight: "bold", // Equivalent to font-bold
                cursor: "pointer", // Equivalent to cursor-pointer
                transition: "background-color 200ms ease-in-out", // Equivalent to transition ease-in-out duration-200
                "&:hover": {
                  // Equivalent to hover:bg-gray-700
                  backgroundColor: "#374151",
                },
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
                  sx={{
                    color: orderBy === "asc" ? "#ff9800" : "#4db6ac",
                    transform:
                      orderBy === "asc" ? "rotate(-180deg)" : "rotate(0deg)",
                    transition: "color 300ms, transform 300ms",
                    display:
                      field === "dep_terminal" || field === "arr_terminal"
                        ? "block"
                        : "none",
                  }}
                />
              </div>
            </TableCell>
            <TableCell
              sx={{
                width: "16.666666667%", // Equivalent to w-1/6
                color: "#facc15", // Equivalent to text-yellow-400
                fontWeight: "bold", // Equivalent to font-bold
                cursor: "pointer", // Equivalent to cursor-pointer
                transition: "background-color 200ms ease-in-out", // Equivalent to transition ease-in-out duration-200
                "&:hover": {
                  // Equivalent to hover:bg-gray-700
                  backgroundColor: "#374151",
                },
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
                  sx={{
                    color: orderBy === "asc" ? "#ff9800" : "#4db6ac",
                    transform:
                      orderBy === "asc" ? "rotate(-180deg)" : "rotate(0deg)",
                    transition: "color 300ms, transform 300ms",
                    display:
                      field === "dep_gate" || field === "arr_gate"
                        ? "block"
                        : "none",
                  }}
                />
              </div>
            </TableCell>
            <TableCell
              sx={{
                width: "16.666666667%", // Equivalent to w-1/6
                color: "#facc15", // Equivalent to text-yellow-400
                fontWeight: "bold", // Equivalent to font-bold
                cursor: "pointer", // Equivalent to cursor-pointer
                transition: "background-color 200ms ease-in-out", // Equivalent to transition ease-in-out duration-200
                "&:hover": {
                  // Equivalent to hover:bg-gray-700
                  backgroundColor: "#374151",
                },
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
                  sx={{
                    color: orderBy === "asc" ? "#ff9800" : "#4db6ac",
                    transform:
                      orderBy === "asc" ? "rotate(-180deg)" : "rotate(0deg)",
                    transition: "color 300ms, transform 300ms",
                    display: field === "status" ? "block" : "none",
                  }}
                />
              </div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {showDepartures
            ? departureFlights.slice(0, paginate).map((row) => (
                <TableRow
                  key={row.flight_iata}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      fontFamily: "PressStart2P-Regular",
                      color: "#facc15",
                    }}
                  >
                    {row.dep_time.split(" ")[1]}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontFamily: "PressStart2P-Regular",
                      color: "#f8fafc",
                    }}
                  >
                    {row.flight_iata}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontFamily: "PressStart2P-Regular",
                      color: "#f8fafc",
                    }}
                  >
                    {row.arr_iata}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontFamily: "PressStart2P-Regular",
                      color: "#f8fafc",
                    }}
                  >
                    {row.dep_terminal}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontFamily: "PressStart2P-Regular",
                      color: "#facc15",
                    }}
                  >
                    {row.dep_gate}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontFamily: "PressStart2P-Regular",
                      textTransform: "uppercase",
                      color:
                        row.status === "active"
                          ? "#00bcd4"
                          : row.status === "cancelled"
                          ? "#f44336"
                          : row.status === "landed"
                          ? "#4caf50"
                          : "#dfe3e8",
                    }}
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
                  key={row.flight_iata}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      fontFamily: "PressStart2P-Regular",
                      color: "#facc15",
                    }}
                  >
                    {row.arr_time.split(" ")[1]}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontFamily: "PressStart2P-Regular",
                      color: "#f8fafc",
                    }}
                  >
                    {row.flight_iata}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontFamily: "PressStart2P-Regular",
                      color: "#f8fafc",
                    }}
                  >
                    {row.dep_iata}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontFamily: "PressStart2P-Regular",
                      color: "#f8fafc",
                    }}
                  >
                    {row.arr_terminal}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontFamily: "PressStart2P-Regular",
                      color: "#facc15",
                    }}
                  >
                    {row.arr_gate}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{
                      fontFamily: "PressStart2P-Regular",
                      textTransform: "uppercase",
                      color:
                        row.status === "active"
                          ? "#00bcd4"
                          : row.status === "cancelled"
                          ? "#f44336"
                          : row.status === "landed"
                          ? "#4caf50"
                          : "#dfe3e8",
                    }}
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
