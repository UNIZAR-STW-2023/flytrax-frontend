import React, { useState, useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DateField } from "@mui/x-date-pickers/DateField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Alert, Autocomplete, Box, Snackbar } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import countries from "../../assets/dummy/countries";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Link from "next/link";
import dayjs from "dayjs";
import PasswordStrengthBar from "react-password-strength-bar";
import {
  faAt,
  faCalendarAlt,
  faGlobeAmericas,
  faLock,
  faPhone,
  faTransgender,
  faUser,
  faUserAstronaut,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import PersonIcon from "@mui/icons-material/Person";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import KeyIcon from "@mui/icons-material/Key";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import TransgenderIcon from "@mui/icons-material/Transgender";
import PublicIcon from "@mui/icons-material/Public";
import axios from "axios";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

// URLs para manejo de datos en la BD
const registerURL = "https://flytrax-backend.vercel.app/users";

const theme = createTheme({
  typography: {
    fontFamily: [
      '"SF Pro Display Regular"',
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

// Expresión regular para validar formato de correo electrónico
const regExpMail = new RegExp(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[\w-]{2,}$/g);
// Expresión regular para validar formato de nombre de usuario
const regExpNickname = new RegExp(
  /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/
);

const Register = () => {
  // Manejo de errores en el formulario
  const {
    register,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  // Manejo de sesión y redirección
  const { data: session } = useSession();
  const router = useRouter();

  // Variables de estado
  const [nickName, setNickName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(!session ? "" : session.user.email);
  const [birthday, setBirthday] = useState(dayjs());
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [passwdStrength, setPasswdStrength] = useState("");

  // Visibilidad de la contraseña
  const [typePass, setTypePass] = useState("password");
  const [typeCPass, setTypeCPass] = useState("password");
  const [iconPass, setIconPass] = useState(false);
  const [iconCPass, setIconCPass] = useState(false);

  // Alertas de error
  const [showAlertPasswd, setShowAlertPasswd] = useState(false);
  const [showAlertEmpty, setShowAlertEmpty] = useState(false);
  const [showAlertEmail, setShowAlertEmail] = useState(false);
  const [showAlertNickRegExp, setShowAlertNickRegExp] = useState(false);
  const [showAlertPassStrength, setShowAlertPassStrength] = useState(false);
  const [showAlertRegister, setShowAlertRegister] = useState(false);

  // Mostrar contraseña
  const handleToggle = () => {
    if (typePass === "password") {
      setIconPass(true);
      setTypePass("text");
    } else {
      setIconPass(false);
      setTypePass("password");
    }
  };

  // Mostrar contraseña
  const handleToggle2 = () => {
    if (typeCPass === "password") {
      setIconCPass(true);
      setTypeCPass("text");
    } else {
      setIconCPass(false);
      setTypeCPass("password");
    }
  };

  // Cerrar alertas
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowAlertPasswd(false);
    setShowAlertEmpty(false);
    setShowAlertEmail(false);
    setShowAlertNickRegExp(false);
    setShowAlertPassStrength(false);
    setShowAlertRegister(false);
  };

  // Comprobar si hay campos vacíos
  const checkNullForm = () => {
    if (
      firstName === "" ||
      lastName === "" ||
      nickName === "" ||
      email === "" ||
      birthday === "" ||
      gender === "" ||
      phone === "" ||
      country === "" ||
      password === ""
    ) {
      return true;
    } else {
      return false;
    }
  };

  // Comprobar si las contraseñas son iguales
  const checkPassword = () => {
    if (password !== cPassword) {
      return true;
    } else {
      return false;
    }
  };

  // Comprobar la validez de un nombre de usuario
  const checkRegExpNickName = () => {
    if (
      errors.nickName?.message ===
        "únicamente permitidos caracteres alfanuméricos" ||
      errors.nickName?.message ===
        "el nombre debe tener al menos 8 caracteres" ||
      errors.nickName?.message ===
        "el nombre debe tener como máximo 20 caracteres"
    ) {
      return true;
    } else {
      return false;
    }
  };

  // Comprobar la validez de un correo electrónico
  const checkRegExpEmail = () => {
    if (errors.email?.message === "Correo electrónico no válido") {
      return true;
    } else {
      return false;
    }
  };

  // Comprobar la fuerza de la contraseña
  const checkPasswordStrength = () => {
    if (passwdStrength <= 1) {
      return true;
    } else {
      return false;
    }
  };

  // Función para gestionar tecla pulsada
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleRegister();
    } else {
      return;
    }
  };

  const setCountryCode = (value) => {
    countries.map((country) => {
      if (country.name === value) {
        setCountry(country.code);
      }
    });
  };

  // Función de registro
  const handleRegister = () => {
    if (checkNullForm()) {
      setShowAlertEmpty(true);
    } else if (checkRegExpEmail()) {
      setShowAlertEmail(true);
    } else if (checkRegExpNickName()) {
      setShowAlertNickRegExp(true);
    } else if (checkPassword()) {
      setShowAlertPasswd(true);
    } else if (checkPasswordStrength()) {
      setShowAlertPassStrength(true);
    } else {
      registerUser();
    }
  };

  // Función de registro
  const registerUser = async () => {
    // Datos a enviar en la petición
    const data = {
      name: firstName,
      surname: lastName,
      nickname: nickName,
      email: email,
      dateOfBirth: birthday.format("DD/MM/YYYY"),
      phone: phone,
      country: country,
      password: password,
      gender: gender,
    };

    // Petición POST a la API de Flytrax
    await axios
      .post(registerURL, data)
      .then((response, error) => {
        if (response.status === 200) {
          setShowAlertRegister(true);
          setTimeout(() => {
            router.push("/login");
          }, 500);
        } else {
          console.log(error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App-header justify-center select-none">
        <h1
          className="text-4xl font-bold text-slate-900
        pt-28 pb-5"
        >
          Registrar cuenta
        </h1>
        <div className="grid lg:grid-cols-2 gap-3">
          <div className="grid col-span-1 gap-3 lg:w-96">
            <div className="grid grid-cols-10 items-center text-center gap-1">
              <div className="grid place-items-center col-span-1 bg-slate-600 shadow-sm shadow-slate-400 rounded-t-md h-full">
                <PersonIcon sx={{ color: "white" }} />
              </div>
              <TextField
                onKeyDown={handleKeyDown}
                name="firstName"
                className="col-span-9"
                required
                id="fistName-input"
                type="text"
                label="Nombre"
                placeholder="Introduce tu nombre"
                variant="filled"
                onChange={({ target }) => setFirstName(target.value)}
              />
            </div>
          </div>
          <div className="grid col-span-1 gap-3 lg:w-96">
            <div className="grid grid-cols-10 items-center text-center gap-1">
              <div className="grid place-items-center col-span-1 bg-slate-600 shadow-sm shadow-slate-400 rounded-t-md h-full">
                <PersonIcon sx={{ color: "white" }} />
              </div>
              <TextField
                onKeyDown={handleKeyDown}
                name="lastName"
                className="col-span-9"
                required
                id="lastName-input"
                type="text"
                label="Apellido"
                placeholder="Introduce tu apellido"
                variant="filled"
                onChange={({ target }) => setLastName(target.value)}
              />
            </div>
          </div>
          <div className="grid col-span-1 gap-3 lg:w-96">
            <div className="grid grid-cols-10 items-center text-center gap-1">
              <div className="grid place-items-center col-span-1 bg-slate-600 shadow-sm shadow-slate-400 rounded-t-md h-full">
                <PersonOutlineIcon sx={{ color: "white" }} />
              </div>
              <TextField
                onKeyDown={handleKeyDown}
                name="nickName"
                {...register("nickName", {
                  pattern: {
                    value: regExpNickname,
                    message: "únicamente permitidos caracteres alfanuméricos",
                  },
                  minLength: {
                    value: 8,
                    message: "el nombre debe tener al menos 8 caracteres",
                  },
                  maxLength: {
                    value: 20,
                    message: "el nombre debe tener como máximo 20 caracteres",
                  },
                })}
                className="col-span-9"
                required
                id="nickName-input"
                type="text"
                label="Nombre de usuario"
                placeholder="Introduce tu nombre de usuario"
                variant="filled"
                onChange={({ target }) => setNickName(target.value)}
              />
            </div>
          </div>
          <div className="grid col-span-1 gap-3 lg:w-96">
            <div className="grid grid-cols-10 items-center text-center gap-1">
              <div className="grid place-items-center col-span-1 bg-slate-600 shadow-sm shadow-slate-400 rounded-t-md h-full">
                <AlternateEmailIcon sx={{ color: "white" }} />
              </div>
              <TextField
                onKeyDown={handleKeyDown}
                name="email"
                {...register("email", {
                  pattern: {
                    value: regExpMail,
                    message: "Correo electrónico no válido",
                  },
                })}
                className="col-span-9"
                required={!session ? true : false}
                id="email-input"
                type="email"
                label={!session ? "Correo electrónico" : session.user.email}
                placeholder={
                  !session
                    ? "Introduce tu correo electrónico"
                    : session.user.email
                }
                variant="filled"
                disabled={!session ? false : true}
                onChange={({ target }) => setEmail(target.value)}
              />
            </div>
          </div>
          <div className="grid col-span-1 gap-3 lg:w-96">
            <div className="grid grid-cols-10 items-center text-center gap-1">
              <div className="grid place-items-center col-span-1 bg-slate-600 shadow-sm shadow-slate-400 rounded-t-md h-full">
                <CalendarMonthIcon sx={{ color: "white" }} />
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField
                  onKeyDown={handleKeyDown}
                  name="birthday"
                  className="col-span-9"
                  required
                  label="Fecha de nacimiento"
                  format="DD/MM/YYYY"
                  variant="filled"
                  value={birthday}
                  onChange={(newValue) => setBirthday(newValue)}
                />
              </LocalizationProvider>
            </div>
          </div>
          <div className="grid col-span-1 gap-3 lg:w-96">
            <div
              name="gender"
              className="grid grid-cols-10 items-center text-center gap-1"
            >
              <div className="grid place-items-center col-span-1 bg-slate-600 shadow-sm shadow-slate-400 rounded-t-md h-full">
                <TransgenderIcon sx={{ color: "white" }} />
              </div>
              <FormControl className="col-span-9" variant="filled" required>
                <InputLabel id="gender-select-filled">Género</InputLabel>
                <Select
                  onKeyDown={handleKeyDown}
                  className="text-left"
                  onChange={({ target }) => setGender(target.value)}
                  labelId="gender-select-filled"
                  id="gender-select-filled"
                >
                  <MenuItem
                    className="cursor-pointer hover:text-rose-700 transition"
                    value="M"
                  >
                    Hombre
                  </MenuItem>
                  <MenuItem
                    className="cursor-pointer hover:text-rose-700 transition"
                    value="F"
                  >
                    Mujer
                  </MenuItem>
                  <MenuItem
                    className="cursor-pointer hover:text-rose-700 transition"
                    value="NB"
                  >
                    No binario
                  </MenuItem>
                  <MenuItem
                    className="cursor-pointer hover:text-rose-700 transition"
                    value="NA"
                  >
                    Prefiero no decirlo
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="grid col-span-1 gap-3 lg:w-96">
            <div className="grid grid-cols-10 items-center text-center gap-1">
              <div className="grid place-items-center col-span-1 bg-slate-600 shadow-sm shadow-slate-400 rounded-t-md h-full">
                <PhoneIcon sx={{ color: "white" }} />
              </div>
              <TextField
                onKeyDown={handleKeyDown}
                name="phone"
                className="col-span-9"
                required
                id="phone-input"
                type="text"
                label="Teléfono"
                placeholder="Introduce tu número de teléfono"
                variant="filled"
                onChange={({ target }) => setPhone(target.value)}
              />
            </div>
          </div>
          <div className="grid col-span-1 gap-3 lg:w-96">
            <div
              name="country"
              className="grid grid-cols-10 items-center text-center gap-1"
            >
              <div className="grid place-items-center col-span-1 bg-slate-600 shadow-sm shadow-slate-400 rounded-t-md h-full">
                <PublicIcon sx={{ color: "white" }} />
              </div>
              <Autocomplete
                onKeyDown={handleKeyDown}
                onSelect={({ target }) => setCountryCode(target.value)}
                className="col-span-9"
                required
                autoHighlight
                id="combo-box-demo"
                options={countries}
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    {/* eslint-disable-next-line */}
                    <img
                      src={`https://flagcdn.com/20x15/${option.code.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/40x30/${option.code.toLowerCase()}.png 2x`}
                      width="20"
                      height="15"
                      alt={option.name}
                    />
                    {option.name} ({option.code})
                  </Box>
                )}
                renderInput={(params) => (
                  <TextField
                    label="Selecciona un país"
                    variant="filled"
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "country", // disable autocomplete and autofill
                    }}
                  />
                )}
              />
            </div>
          </div>
          <div className="grid col-span-1 gap-3 lg:w-96">
            <div className="grid grid-cols-10 items-center text-center gap-1">
              <div className="grid place-items-center col-span-1 bg-slate-600 shadow-sm shadow-slate-400 rounded-t-md h-full">
                <KeyIcon sx={{ color: "white" }} />
              </div>
              <TextField
                onKeyDown={handleKeyDown}
                name="password"
                className="col-span-8"
                required
                id="password-input"
                type={typePass}
                label="Contraseña"
                placeholder="Introduce tu contraseña"
                variant="filled"
                onChange={({ target }) => setPassword(target.value)}
              />
              <div
                onClick={handleToggle}
                className="grid place-items-center col-span-1 bg-stone-400 bg-opacity-20 cursor-pointer hover:bg-slate-300 ease-in-out duration-150 shadow-sm shadow-slate-600 rounded-t-md h-full"
              >
                {iconPass ? (
                  <VisibilityIcon className="text-slate-600" />
                ) : (
                  <VisibilityOffIcon className="text-slate-600" />
                )}
              </div>
              <PasswordStrengthBar
                className="col-span-10"
                password={password}
                shortScoreWord="Demasiado corta"
                scoreWords={[
                  "Muy poco segura",
                  "Débil",
                  "Buena",
                  "Muy buena",
                  "Excelente",
                ]}
                minLength={8}
              />
            </div>
          </div>
          <div className="grid col-span-1 gap-3 lg:w-96">
            <div className="grid grid-cols-10 items-center text-center gap-1">
              <div className="grid place-items-center col-span-1 bg-slate-600 shadow-sm shadow-slate-400 rounded-t-md h-full">
                <KeyIcon sx={{ color: "white" }} />
              </div>
              <TextField
                onKeyDown={handleKeyDown}
                name="cpassword"
                className="col-span-8"
                required
                id="cpassword-input"
                type={typeCPass}
                label="Confirmar contraseña"
                placeholder="Confirma tu contraseña"
                variant="filled"
                onChange={({ target }) => setCPassword(target.value)}
              />
              <div
                onClick={handleToggle2}
                className="grid place-items-center col-span-1 bg-stone-400 bg-opacity-20 cursor-pointer hover:bg-slate-300 ease-in-out duration-150 shadow-sm shadow-slate-600 rounded-t-md h-full"
              >
                {iconCPass ? (
                  <VisibilityIcon className="text-slate-600" />
                ) : (
                  <VisibilityOffIcon className="text-slate-600" />
                )}
              </div>
              <PasswordStrengthBar
                className="col-span-10"
                password={cPassword}
                shortScoreWord="Demasiado corta"
                scoreWords={[
                  "Muy poco segura",
                  "Débil",
                  "Buena",
                  "Muy buena",
                  "Excelente",
                ]}
                minLength={8}
                onChangeScore={(score, feedback) => {
                  setPasswdStrength(score);
                }}
              />
            </div>
          </div>
          <button
            onClick={handleRegister}
            className="md:col-span-2 w-80 md:w-96 md:mx-auto bg-rose-600 text-slate-50 uppercase rounded-xl hover:bg-rose-800 ease-in-out duration-150 shadow-md h-10"
          >
            Registrar
          </button>
          <div className="md:col-span-2 mx-auto w-80 md:w-96 mt-3 pb-5">
            <p className="text-center text-zinc-700">
              ¿Ya tienes cuenta?{" "}
              <Link
                className="font-medium text-rose-600 hover:text-rose-800 ease-in duration-150"
                href="/login"
              >
                Inicia sesión
              </Link>{" "}
            </p>
          </div>
          <div>
            <Snackbar
              message="No puedes dejar campos vacíos — comprueba los datos"
              open={showAlertEmpty}
              autoHideDuration={4000}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
            >
              <Alert onClose={handleClose} severity="error">
                No puedes dejar campos vacíos —{" "}
                <strong>comprueba los datos</strong>
              </Alert>
            </Snackbar>
            <Snackbar
              message={
                `${errors.email?.message}` +
                "— " +
                <strong>comprueba los datos</strong>
              }
              open={showAlertEmail}
              autoHideDuration={4000}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
            >
              <Alert onClose={handleClose} severity="error">
                {`${errors.email?.message}`} —{" "}
                <strong>comprueba los datos</strong>
              </Alert>
            </Snackbar>
            <Snackbar
              message={
                `${errors.nickName?.message}` +
                "— " +
                <strong>revisa el campo</strong>
              }
              open={showAlertNickRegExp}
              autoHideDuration={4000}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
            >
              <Alert onClose={handleClose} severity="error">
                Nombre de usuario no válido —{" "}
                <strong>{`${errors.nickName?.message}`}</strong>
              </Alert>
            </Snackbar>
            <Snackbar
              message="Las contraseñas no coinciden — comprueba los datos"
              open={showAlertPasswd}
              autoHideDuration={4000}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
            >
              <Alert onClose={handleClose} severity="error">
                Las contraseñas no coinciden —{" "}
                <strong>comprueba los datos</strong>
              </Alert>
            </Snackbar>
            <Snackbar
              message="La contraseña es demasiado débil — ¡piensa en algo más seguro!"
              open={showAlertPassStrength}
              autoHideDuration={4000}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
            >
              <Alert onClose={handleClose} severity="error">
                La contraseña es demasiado débil —{" "}
                <strong>¡piensa en algo más seguro!</strong>
              </Alert>
            </Snackbar>
            <Snackbar
              message="¡Cuenta registrada con éxito!"
              open={showAlertRegister}
              autoHideDuration={3000}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
            >
              <Alert onClose={handleClose} severity="success">
                ¡Cuenta registrada con éxito!
              </Alert>
            </Snackbar>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Register;
