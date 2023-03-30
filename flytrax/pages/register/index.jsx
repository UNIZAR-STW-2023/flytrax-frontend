import React, { useState, useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DateField } from "@mui/x-date-pickers/DateField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import countries from "../../assets/dummy/countries";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Link from "next/link";
import { Autocomplete, Box } from "@mui/material";

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
  return (
    <ThemeProvider theme={theme}>
      <div className="App-header">
        <h1
          className="text-4xl font-bold text-slate-900
        pt-28 pb-5"
        >
          Registrar cuenta
        </h1>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="grid col-span-1 gap-3 md:w-96">
            <TextField
              id="filled"
              type="text"
              label="Nombre"
              placeholder="Introduce tu nombre"
              variant="filled"
            />
            <TextField
              id="filled"
              type="text"
              label="Apellido"
              placeholder="Introduce tu apellido"
              variant="filled"
            />
            <TextField
              id="filled"
              type="text"
              label="Nombre de usuario"
              placeholder="Introduce tu nombre de usuario"
              variant="filled"
            />
            <TextField
              id="filled"
              type="text"
              label="Correo electrónico"
              placeholder="Introduce tu correo electrónico"
              variant="filled"
            />
            <TextField
              id="filled"
              type="password"
              label="Contraseña"
              placeholder="Introduce tu contraseña"
              variant="filled"
            />
          </div>
          <div className="grid col-span-1 gap-3">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateField
                label="Fecha de nacimiento"
                format="MM-DD-YYYY"
                variant="filled"
              />
            </LocalizationProvider>
            <FormControl variant="filled">
              <InputLabel id="gender-select-filled">Género</InputLabel>
              <Select labelId="gender-select-filled" id="gender-select-filled">
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
            <TextField
              id="filled"
              type="text"
              label="Teléfono"
              placeholder="Introduce tu número de teléfono"
              variant="filled"
            />

            <Autocomplete
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
                  <img
                    loading="lazy"
                    width="20"
                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                    alt=""
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
            {/* <Select labelId="gender-select-filled" id="gender-select-filled">
                {countries.map((item) => {
                  return (
                    <MenuItem
                      className="cursor-pointer hover:text-rose-700 transition"
                      key={item.name}
                      value={item.name}
                    >
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select> */}

            <TextField
              id="filled"
              type="password"
              label="Confirmar contraseña"
              placeholder="Confirma tu contraseña"
              variant="filled"
            />
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
