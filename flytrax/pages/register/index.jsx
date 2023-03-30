import React, { useState, useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DateField } from "@mui/x-date-pickers/DateField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Autocomplete, Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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

const Register = () => {
  // Variables de estado
  const [nickName, setNickName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
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
  const [iconPass, setIconPass] = useState(faEyeSlash);
  const [iconCPass, setIconCPass] = useState(faEyeSlash);

  // Mostrar contraseña
  const handleToggle = () => {
    if (typePass === "password") {
      setIconPass(faEye);
      setTypePass("text");
    } else {
      setIconPass(faEyeSlash);
      setTypePass("password");
    }
  };

  // Mostrar contraseña
  const handleToggle2 = () => {
    if (typeCPass === "password") {
      setIconCPass(faEye);
      setTypeCPass("text");
    } else {
      setIconCPass(faEyeSlash);
      setTypeCPass("password");
    }
  };

  console.log(nickName);
  console.log(firstName);
  console.log(lastName);
  console.log(email);
  console.log(password);
  console.log(cPassword);
  console.log(birthday);
  console.log(gender);
  console.log(country);
  console.log(phone);
  console.log(passwdStrength);

  return (
    <ThemeProvider theme={theme}>
      <div className="App-header select-none">
        <h1
          className="text-4xl font-bold text-slate-900
        pt-28 pb-5"
        >
          Registrar cuenta
        </h1>
        <div className="grid md:grid-cols-2 gap-3 md:mx-5">
          <div className="grid col-span-1 gap-3 md:w-96">
            <div className="grid grid-cols-10 items-center text-center gap-1">
              <div className="grid place-items-center col-span-1 bg-slate-600 shadow-sm shadow-slate-400 rounded-t-md h-full">
                <FontAwesomeIcon
                  className="text-zinc-200"
                  icon={faUser}
                  size="lg"
                />
              </div>
              <TextField
                className="col-span-9"
                required
                id="filled"
                type="text"
                label="Nombre"
                placeholder="Introduce tu nombre"
                variant="filled"
                onChange={({ target }) => setFirstName(target.value)}
              />
            </div>
            <div className="grid grid-cols-10 items-center text-center gap-1">
              <div className="grid place-items-center col-span-1 bg-slate-600 shadow-sm shadow-slate-400 rounded-t-md h-full">
                <FontAwesomeIcon
                  className="text-zinc-200"
                  icon={faUser}
                  size="lg"
                />
              </div>
              <TextField
                className="col-span-9"
                required
                id="filled"
                type="text"
                label="Apellido"
                placeholder="Introduce tu apellido"
                variant="filled"
                onChange={({ target }) => setLastName(target.value)}
              />
            </div>
            <div className="grid grid-cols-10 items-center text-center gap-1">
              <div className="grid place-items-center col-span-1 bg-slate-600 shadow-sm shadow-slate-400 rounded-t-md h-full">
                <FontAwesomeIcon
                  className="text-zinc-200"
                  icon={faUserAstronaut}
                  size="lg"
                />
              </div>
              <TextField
                className="col-span-9"
                required
                id="filled"
                type="text"
                label="Nombre de usuario"
                placeholder="Introduce tu nombre de usuario"
                variant="filled"
                onChange={({ target }) => setNickName(target.value)}
              />
            </div>
            <div className="grid grid-cols-10 items-center text-center gap-1">
              <div className="grid place-items-center col-span-1 bg-slate-600 shadow-sm shadow-slate-400 rounded-t-md h-full">
                <FontAwesomeIcon
                  className="text-zinc-200"
                  icon={faAt}
                  size="lg"
                />
              </div>
              <TextField
                className="col-span-9"
                required
                id="filled"
                type="text"
                label="Correo electrónico"
                placeholder="Introduce tu correo electrónico"
                variant="filled"
                onChange={({ target }) => setEmail(target.value)}
              />
            </div>
            <div className="max-md:hidden grid grid-cols-10 items-center text-center gap-1">
              <div className="grid place-items-center col-span-1 bg-slate-600 shadow-sm shadow-slate-400 rounded-t-md h-full">
                <FontAwesomeIcon
                  className="text-zinc-200"
                  icon={faLock}
                  size="lg"
                />
              </div>
              <TextField
                className="col-span-8"
                required
                id="filled"
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
                <FontAwesomeIcon
                  className="text-zinc-600"
                  icon={iconPass}
                  size="lg"
                />
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
            <div className="md:hidden grid grid-cols-10 items-center text-center gap-1">
              <div className="grid place-items-center col-span-1 bg-slate-600 shadow-sm shadow-slate-400 rounded-t-md h-full">
                <FontAwesomeIcon
                  className="text-zinc-200"
                  icon={faGlobeAmericas}
                  size="lg"
                />
              </div>
              <Autocomplete
                onSelect={({ target }) => setCountry(target.value)}
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
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      width="20"
                      height="16"
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
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                  />
                )}
              />
            </div>
          </div>
          <div className="grid col-span-1 gap-3">
            <div className="grid grid-cols-10 items-center text-center gap-1">
              <div className="grid place-items-center col-span-1 bg-slate-600 shadow-sm shadow-slate-400 rounded-t-md h-full">
                <FontAwesomeIcon
                  className="text-zinc-200"
                  icon={faCalendarAlt}
                  size="lg"
                />
              </div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField
                  className="col-span-9"
                  required
                  label="Fecha de nacimiento"
                  format="DD-MM-YYYY"
                  variant="filled"
                  value={birthday}
                  onChange={(newValue) => setBirthday(newValue)}
                />
              </LocalizationProvider>
            </div>
            <div className="grid grid-cols-10 items-center text-center gap-1">
              <div className="grid place-items-center col-span-1 bg-slate-600 shadow-sm shadow-slate-400 rounded-t-md h-full">
                <FontAwesomeIcon
                  className="text-zinc-200"
                  icon={faTransgender}
                  size="lg"
                />
              </div>
              <FormControl className="col-span-9" variant="filled" required>
                <InputLabel id="gender-select-filled">Género</InputLabel>
                <Select
                  className="text-left"
                  onChange={({ target }) => setGender(target.value)}
                  labelId="gender-select-filled"
                  id="gender-select-filled"
                >
                  <MenuItem
                    className="cursor-pointer hover:text-rose-700 transition"
                    value="H"
                  >
                    Hombre
                  </MenuItem>
                  <MenuItem
                    className="cursor-pointer hover:text-rose-700 transition"
                    value="M"
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
            <div className="grid grid-cols-10 items-center text-center gap-1">
              <div className="grid place-items-center col-span-1 bg-slate-600 shadow-sm shadow-slate-400 rounded-t-md h-full">
                <FontAwesomeIcon
                  className="text-zinc-200"
                  icon={faPhone}
                  size="lg"
                />
              </div>
              <TextField
                className="col-span-9"
                required
                id="filled"
                type="text"
                label="Teléfono"
                placeholder="Introduce tu número de teléfono"
                variant="filled"
                onChange={({ target }) => setPhone(target.value)}
              />
            </div>
            <div className="max-md:hidden grid grid-cols-10 items-center text-center gap-1">
              <div className="grid place-items-center col-span-1 bg-slate-600 shadow-sm shadow-slate-400 rounded-t-md h-full">
                <FontAwesomeIcon
                  className="text-zinc-200"
                  icon={faGlobeAmericas}
                  size="lg"
                />
              </div>
              <Autocomplete
                onSelect={({ target }) => setCountry(target.value)}
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
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      width="20"
                      height="16"
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
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                  />
                )}
              />
            </div>
            <div className="md:hidden grid grid-cols-10 items-center text-center gap-1">
              <div className="grid place-items-center col-span-1 bg-slate-600 shadow-sm shadow-slate-400 rounded-t-md h-full">
                <FontAwesomeIcon
                  className="text-zinc-200"
                  icon={faLock}
                  size="lg"
                />
              </div>
              <TextField
                className="col-span-8"
                required
                id="filled"
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
                <FontAwesomeIcon
                  className="text-zinc-600"
                  icon={iconPass}
                  size="lg"
                />
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
            <div className="grid grid-cols-10 items-center text-center gap-1">
              <div className="grid place-items-center col-span-1 bg-slate-600 shadow-sm shadow-slate-400 rounded-t-md h-full">
                <FontAwesomeIcon
                  className="text-zinc-200"
                  icon={faLock}
                  size="lg"
                />
              </div>
              <TextField
                className="col-span-8"
                required
                id="filled"
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
                <FontAwesomeIcon
                  className="text-zinc-600"
                  icon={iconCPass}
                  size="lg"
                />
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
          <button className="md:col-span-2 w-80 md:w-96 md:mx-auto bg-rose-600 text-slate-50 uppercase rounded-xl hover:bg-rose-800 ease-in-out duration-150 shadow-md h-10">
            Registrar
          </button>
          <div class="md:col-span-2 mx-auto w-80 md:w-96 mt-3 pb-5">
            <p class="text-center text-zinc-700">
              ¿Ya tienes cuenta?{" "}
              <Link
                className="font-medium text-rose-600 hover:text-rose-800 ease-in duration-150"
                href="/login"
              >
                Inicia sesión
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Register;
