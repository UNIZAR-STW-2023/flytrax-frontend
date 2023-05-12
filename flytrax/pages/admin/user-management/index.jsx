import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  Add,
  ArrowBack,
  ArrowUpward,
  KeyboardDoubleArrowUp,
} from "@mui/icons-material";
import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import BlockIcon from "@mui/icons-material/Block";
import CheckIcon from "@mui/icons-material/Check";
import Loader from "../../../components/Loader";

const UserManagement = () => {
  const router = useRouter();

  const usersURL = "https://flytrax-backend.vercel.app/users";
  const banUserURL = "https://flytrax-backend.vercel.app/banUsers/";
  const unBanUserURL = "https://flytrax-backend.vercel.app/unBanUsers/";

  // Comprobar Admin User
  const ADMIN_COOKIE = getCookie("adminSessionToken");

  const usersPerPage = 15;
  const [adminToken, setAdminToken] = useState("");
  const [users, setUsers] = useState([]);
  const [paginate, setPaginate] = useState(usersPerPage);
  const [orderBy, setOrderBy] = useState("asc");
  const [field, setField] = useState("");
  const [loading, setLoading] = useState(true);

  // Alertas de error
  const [showAlertBan, setShowAlertBan] = useState(false);
  const [showAlertUnBan, setShowAlertUnBan] = useState(false);

  // Cerrar alerta
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowAlertBan(false);
    setShowAlertUnBan(false);
  };

  const handleBanUser = (user) => {
    user.banned ? UnBanUser(user) : BanUser(user);
  };

  const BanUser = async (user) => {
    // Datos a enviar en la petición
    const data = {
      email: user.email,
    };

    axios
      .post(banUserURL, data, {
        headers: { Authorization: `Bearer ${adminToken}` },
      })
      .then(() => {
        setShowAlertBan(true);
        getUsers();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const UnBanUser = async (user) => {
    // Datos a enviar en la petición
    const data = {
      email: user.email,
    };

    axios
      .post(unBanUserURL, data, {
        headers: { Authorization: `Bearer ${adminToken}` },
      })
      .then(() => {
        setShowAlertUnBan(true);
        getUsers();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getUsers = async () => {
    await axios
      .get(usersURL, {
        headers: { Authorization: `Bearer ${adminToken}` },
      })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log("Error fetching the data: ", error);
      });
  };

  useEffect(() => {
    // Fetch user cookie value
    const adminSessionCookie = getCookie("adminSessionToken");
    // Update state with user cookie value
    setAdminToken(adminSessionCookie);

    getUsers();
    setTimeout(() => setLoading(false), 1500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminToken, setAdminToken]);

  // Función para cargar más aeropuertos
  const loadMore = () => {
    setPaginate((prevValue) => prevValue + usersPerPage);
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

  const sortUsers = (array, param, orderBy, setArray, setOrderBy) => {
    // En caso de ser una fecha de nacimiento, se ordena de otra forma
    if (param === "dateOfBirth") {
      // Hay que calcular primero la edad de cada usuario
      const sortedArray = [...array].sort((a, b) => {
        if (a.dateOfBirth === null) return -1;
        if (b.dateOfBirth === null) return 1;
        return dayjs().diff(
          a.dateOfBirth.split("/")[2] +
            "-" +
            a.dateOfBirth.split("/")[1] +
            "-" +
            a.dateOfBirth.split("/")[0],
          "year"
        ) <
          dayjs().diff(
            b.dateOfBirth.split("/")[2] +
              "-" +
              b.dateOfBirth.split("/")[1] +
              "-" +
              b.dateOfBirth.split("/")[0],
            "year"
          )
          ? -1
          : 1;
      });
      setArray(orderBy === "asc" ? sortedArray : sortedArray.reverse());
      setOrderBy(orderBy === "asc" ? "desc" : "asc");
      setField(param);
    } else {
      const sortedArray = [...array].sort((a, b) => {
        if (a[param] === null) return -1;
        if (b[param] === null) return 1;
        return a[param] < b[param] ? -1 : 1;
      });
      setArray(orderBy === "asc" ? sortedArray : sortedArray.reverse());
      setOrderBy(orderBy === "asc" ? "desc" : "asc");
      setField(param);
    }
  };

  const sortUsersByBD = (array, orderBy, setArray, setOrderBy) => {
    const sortedArray = [...array].sort((a, b) => {
      if (a.dateOfBirth === null) return -1;
      if (b.dateOfBirth === null) return 1;
      return dayjs().diff(
        a.dateOfBirth.split("/")[2] +
          "-" +
          a.dateOfBirth.split("/")[1] +
          "-" +
          a.dateOfBirth.split("/")[0],
        "year"
      ) <
        dayjs().diff(
          b.dateOfBirth.split("/")[2] +
            "-" +
            b.dateOfBirth.split("/")[1] +
            "-" +
            b.dateOfBirth.split("/")[0],
          "year"
        )
        ? -1
        : 1;
    });

    setArray(orderBy === "asc" ? sortedArray : sortedArray.reverse());
    setOrderBy(orderBy === "asc" ? "desc" : "asc");
  };

  return !loading ? (
    <>
      <div className="flex flex-col justify-center items-center align-middle m-auto w-11/12 max-sm:w-10/12 my-24 select-none">
        <h1 className="sm:flex items-center align-center gap-2 my-10 text-black text-center justify-center font-bold max-sm:text-3xl sm:text-4xl">
          Gestión de usuarios
        </h1>
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
                    width: "12.5%", // Equivalent to w-1/6
                    color: "#facc15", // Equivalent to text-yellow-400
                    fontWeight: "bold", // Equivalent to font-bold
                    backgroundColor: "#111827",
                    fontFamily: "PressStart2P-Regular",
                  }}
                  align="left"
                >
                  <div className="flex align-middle items-center flight-panel-head">
                    Acción
                  </div>
                </TableCell>
                <TableCell
                  sx={{
                    width: "12.5%", // Equivalent to w-1/6
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
                    sortUsers(users, "name", orderBy, setUsers, setOrderBy)
                  }
                >
                  <div className="flex align-middle items-center flight-panel-head">
                    Nombre
                    <ArrowUpward
                      fontSize="medium"
                      sx={{
                        color: orderBy === "asc" ? "#ff9800" : "#4db6ac",
                        transform:
                          orderBy === "asc"
                            ? "rotate(-180deg)"
                            : "rotate(0deg)",
                        transition: "color 300ms, transform 300ms",
                        display: field === "name" ? "block" : "none",
                      }}
                    />
                  </div>
                </TableCell>
                <TableCell
                  sx={{
                    width: "12.5%", // Equivalent to w-1/6
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
                    sortUsers(users, "surname", orderBy, setUsers, setOrderBy)
                  }
                >
                  <div className="flex align-middle items-center flight-panel-head">
                    Apellido
                    <ArrowUpward
                      fontSize="medium"
                      sx={{
                        color: orderBy === "asc" ? "#ff9800" : "#4db6ac",
                        transform:
                          orderBy === "asc"
                            ? "rotate(-180deg)"
                            : "rotate(0deg)",
                        transition: "color 300ms, transform 300ms",
                        display: field === "surname" ? "block" : "none",
                      }}
                    />
                  </div>
                </TableCell>
                <TableCell
                  sx={{
                    width: "12.5%", // Equivalent to w-1/6
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
                    sortUsers(users, "nickname", orderBy, setUsers, setOrderBy)
                  }
                >
                  <div className="flex align-middle items-center flight-panel-head">
                    Nombre de usuario
                    <ArrowUpward
                      fontSize="medium"
                      sx={{
                        color: orderBy === "asc" ? "#ff9800" : "#4db6ac",
                        transform:
                          orderBy === "asc"
                            ? "rotate(-180deg)"
                            : "rotate(0deg)",
                        transition: "color 300ms, transform 300ms",
                        display: field === "nickname" ? "block" : "none",
                      }}
                    />
                  </div>
                </TableCell>
                <TableCell
                  sx={{
                    width: "12.5%", // Equivalent to w-1/6
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
                    sortUsers(users, "email", orderBy, setUsers, setOrderBy)
                  }
                >
                  <div className="flex align-middle items-center flight-panel-head">
                    Email
                    <ArrowUpward
                      fontSize="medium"
                      sx={{
                        color: orderBy === "asc" ? "#ff9800" : "#4db6ac",
                        transform:
                          orderBy === "asc"
                            ? "rotate(-180deg)"
                            : "rotate(0deg)",
                        transition: "color 300ms, transform 300ms",
                        display: field === "email" ? "block" : "none",
                      }}
                    />
                  </div>
                </TableCell>
                <TableCell
                  sx={{
                    width: "12.5%", // Equivalent to w-1/6
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
                    sortUsers(users, "gender", orderBy, setUsers, setOrderBy)
                  }
                >
                  <div className="flex align-middle items-center flight-panel-head">
                    Género
                    <ArrowUpward
                      fontSize="medium"
                      sx={{
                        color: orderBy === "asc" ? "#ff9800" : "#4db6ac",
                        transform:
                          orderBy === "asc"
                            ? "rotate(-180deg)"
                            : "rotate(0deg)",
                        transition: "color 300ms, transform 300ms",
                        display: field === "gender" ? "block" : "none",
                      }}
                    />
                  </div>
                </TableCell>
                <TableCell
                  sx={{
                    width: "12.5%", // Equivalent to w-1/6
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
                    sortUsers(users, "country", orderBy, setUsers, setOrderBy)
                  }
                >
                  <div className="flex align-middle items-center flight-panel-head">
                    País
                    <ArrowUpward
                      fontSize="medium"
                      sx={{
                        color: orderBy === "asc" ? "#ff9800" : "#4db6ac",
                        transform:
                          orderBy === "asc"
                            ? "rotate(-180deg)"
                            : "rotate(0deg)",
                        transition: "color 300ms, transform 300ms",
                        display: field === "country" ? "block" : "none",
                      }}
                    />
                  </div>
                </TableCell>
                <TableCell
                  sx={{
                    width: "12.5%", // Equivalent to w-1/6
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
                    sortUsers(
                      users,
                      "dateOfBirth",
                      orderBy,
                      setUsers,
                      setOrderBy
                    )
                  }
                >
                  <div className="flex align-middle items-center flight-panel-head">
                    Edad
                    <ArrowUpward
                      fontSize="medium"
                      sx={{
                        color: orderBy === "asc" ? "#ff9800" : "#4db6ac",
                        transform:
                          orderBy === "asc"
                            ? "rotate(-180deg)"
                            : "rotate(0deg)",
                        transition: "color 300ms, transform 300ms",
                        display: field === "dateOfBirth" ? "block" : "none",
                      }}
                    />
                  </div>
                </TableCell>
                <TableCell
                  sx={{
                    width: "12.5%", // Equivalent to w-1/6
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
                    sortUsers(users, "banned", orderBy, setUsers, setOrderBy)
                  }
                >
                  <div className="flex align-middle items-center flight-panel-head">
                    Estado
                    <ArrowUpward
                      fontSize="medium"
                      sx={{
                        color: orderBy === "asc" ? "#ff9800" : "#4db6ac",
                        transform:
                          orderBy === "asc"
                            ? "rotate(-180deg)"
                            : "rotate(0deg)",
                        transition: "color 300ms, transform 300ms",
                        display: field === "banned" ? "block" : "none",
                      }}
                    />
                  </div>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.slice(0, paginate).map((user) => (
                <TableRow
                  key={user.email}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      fontFamily: "PressStart2P-Regular",
                      textTransform: "uppercase",
                      color: user.banned ? "#13FC00" : "#fc0101",
                      transition: "background-color 200ms ease-in-out", // Equivalent to transition ease-in-out duration-200
                      "&:hover": {
                        // Equivalent to hover:bg-gray-700
                        backgroundColor: "#111827",
                      },
                      backgroundColor: "#374151",
                    }}
                  >
                    <button
                      onClick={() => handleBanUser(user)}
                      className="flex gap-2 align-middle items-center flight-panel-head uppercase"
                    >
                      {user.banned ? (
                        <CheckIcon
                          fontSize="medium"
                          sx={{ color: "#13FC00" }}
                        />
                      ) : (
                        <BlockIcon
                          fontSize="medium"
                          sx={{ color: "#fc0101" }}
                        />
                      )}
                      {user.banned ? "Unban" : "Ban"}
                    </button>
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      fontFamily: "PressStart2P-Regular",
                      color: "white",
                    }}
                  >
                    {user.name}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      fontFamily: "PressStart2P-Regular",
                      color: "white",
                    }}
                  >
                    {user.surname}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      fontFamily: "PressStart2P-Regular",
                      color: "#facc15",
                    }}
                  >
                    {user.nickname}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      fontFamily: "PressStart2P-Regular",
                      color: "white",
                    }}
                  >
                    {user.email}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      fontFamily: "PressStart2P-Regular",
                      color:
                        user.gender === "M"
                          ? "#2196f3"
                          : user.gender === "F"
                          ? "#DC7086"
                          : user.gender === "NB"
                          ? "#9c27b0"
                          : "white",
                    }}
                  >
                    {user.gender === "M" ? (
                      <MaleIcon fontSize="medium" />
                    ) : user.gender === "F" ? (
                      <FemaleIcon fontSize="medium" />
                    ) : user.gender === "NB" ? null : null}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      fontFamily: "PressStart2P-Regular",
                      color: "white",
                    }}
                  >
                    {user.country}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      fontFamily: "PressStart2P-Regular",
                      color:
                        dayjs().diff(
                          user.dateOfBirth.split("/")[2] +
                            "-" +
                            user.dateOfBirth.split("/")[1] +
                            "-" +
                            user.dateOfBirth.split("/")[0],
                          "year"
                        ) < 18
                          ? "#f44336"
                          : "white",
                    }}
                  >
                    {dayjs().diff(
                      user.dateOfBirth.split("/")[2] +
                        "-" +
                        user.dateOfBirth.split("/")[1] +
                        "-" +
                        user.dateOfBirth.split("/")[0],
                      "year"
                    )}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      fontFamily: "PressStart2P-Regular",
                      textTransform: "uppercase",
                      color: user.banned ? "#fc0101" : "#13FC00",
                    }}
                  >
                    {user.banned ? "Baneado" : "Activo"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {paginate < users?.length && (
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
      </div>
      <div>
        <Snackbar
          message="¡Usuario bloqueado! — acceso denegado"
          open={showAlertBan}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <Alert onClose={handleClose} severity="error">
            ¡Usuario bloqueado! — <strong>acceso denegado</strong>
          </Alert>
        </Snackbar>
        <Snackbar
          message="¡Usuario desbloqueado! — acceso permitido"
          open={showAlertUnBan}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <Alert onClose={handleClose} severity="success">
            ¡Usuario desbloqueado! — <strong>acceso permitido</strong>
          </Alert>
        </Snackbar>
      </div>
      <button
        onClick={() => router.back()}
        className="flex gap-2 hover:text-orange-600 transition ease-in-out duration-200 font-semibold uppercase text-2xl align-middle items-center w-40 m-5"
      >
        <ArrowBack /> Volver
      </button>
    </>
  ) : (
    <Loader />
  );
};

export default UserManagement;
