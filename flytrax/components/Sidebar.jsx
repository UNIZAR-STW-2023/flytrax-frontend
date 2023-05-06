import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import {
  Add,
  AirplanemodeActive,
  KeyboardDoubleArrowUp,
  Search,
} from "@mui/icons-material";
import SearchAppBar from "./Search";
import { getDistance } from "geolib";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

const SwipeableTemporaryDrawer = ({
  latitude,
  longitude,
  onValueChange,
  onDataChange,
}) => {
  const airportsPerPage = 10;
  const [query, setQuery] = useState("");
  const [airports, setAirports] = useState([]);
  const [distance, setDistance] = useState([]);
  const [matchingAirports, setMatchingAirports] = useState([]);
  const [position, setPosition] = useState([latitude, longitude]);
  const [data, setData] = useState({ name: "", iata_code: "" });
  const [paginate, setPaginate] = useState(airportsPerPage);

  // Función para cargar más aeropuertos
  const loadMore = () => {
    setPaginate((prevValue) => prevValue + airportsPerPage);
  };

  // Función para volver al principio de la página
  const scrollToTop = () => {
    const element = document.getElementById("list-top");
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  // Función para introducir la búsqueda en la barra
  const inputQuery = (e) => {
    setQuery(e.target.value);
  };

  const handleAirportClick = (airport) => {
    let coord = [];
    let airportData = { name: "", iata_code: "" };
    console.log(airport);
    coord.push(airport.lat);
    coord.push(airport.lng);
    airportData.name = airport.name;
    airportData.iata_code = airport.iata_code;
    onValueChange(coord);
    onDataChange(airportData);
    setPosition([airport.lat, airport.lng]);
    setData({ name: airport.name, iata_code: airport.iata_code });
    /* toggleDrawer(anchor, false); */
  };

  useEffect(() => {
    onValueChange(position);
    const getAirports = async () => {
      /* await axios
        .get(AirLabs_URL)
        .then((response) => {
          setAirports(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log("Error fetching the data: ", error);
        }); */
      let distancias = [];
      let aeropuertos = [];

      await fetch("assets/data/[AirLabs]_Airports.json")
        .then((response) => response.json())
        .then((data) => {
          // Use the data from the JSON file
          aeropuertos = data.response;
          setAirports(data.response);
          /* aeropuertos.map((airport) => {
            const distance = getDistance(
              { latitude: latitude, longitude: longitude },
              { latitude: airport.lat, longitude: airport.lng }
            );
            if (distance / 1000 < 300 && airport.iata_code != null) {
              distancias.push({
                iata_code: airport.iata_code,
                dist: (distance / 1000).toFixed(2),
              });
            }
          });
          setDistance(distancias); */
        })
        .catch((error) => console.error(error));
    };
    getAirports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);

  const [state, setState] = useState({
    bottom: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box sx={{ width: anchor === "bottom" ? "auto" : 250 }} role="presentation">
      <AppBar
        sx={{
          background: "linear-gradient(220.55deg, #5D85A6 0%, #0E2C5E 100%)",
        }}
        position="sticky"
      >
        <Toolbar>
          <div className="flex justify-between gap-2 bg-slate-500 hover:bg-slate-700 rounded-lg p-2 w-full transition ease-in-out duration-200">
            <SearchIcon color="inherit" />
            <input
              className="bg-transparent outline-none placeholder-slate-300 text-zinc-100 w-full"
              value={query}
              type="search"
              placeholder="Busca aquí un aeropuerto..."
              onChange={inputQuery}
            />
          </div>
        </Toolbar>
      </AppBar>
      <List
        onClick={toggleDrawer(anchor, false)}
        sx={{ height: 300, overflow: "scroll" }}
      >
        {airports
          .filter((airport) => {
            if (query === "") {
              return airport;
            } else if (
              airport.name.toLowerCase().includes(query.toLowerCase()) ||
              airport.country_code.toLowerCase().includes(query.toLowerCase())
            ) {
              return airport;
            }
          })
          .slice(0, paginate)
          .map((airport, index) => (
            <ListItem
              id="list-top"
              onClick={() => handleAirportClick(airport)}
              onKeyDown={toggleDrawer(anchor, false)}
              key={index}
              disablePadding
            >
              <ListItemButton>
                <ListItemIcon>
                  <AirplanemodeActive />
                </ListItemIcon>
                <ListItemText
                  primary={airport.name}
                  secondary={airport.iata_code}
                />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
      {paginate < airports?.length && (
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
    </Box>
  );

  return (
    <div>
      {["bottom"].map((anchor) => (
        <React.Fragment key={anchor}>
          <button
            className="flex justify-center max-sm:w-44 align-middle items-center search_btn gap-1 my-3 px-2 text-slate-50 uppercase rounded-xl hover:bg-cyan-700 ease-in-out duration-150 shadow-md h-10"
            onClick={toggleDrawer(anchor, true)}
          >
            <SearchIcon /> <h2 className="font-regular">Buscar</h2>
          </button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default SwipeableTemporaryDrawer;
