const countries = [
  { name: "Afganistán", code: "AF" },
  { name: "Albania", code: "AL" },
  { name: "Alemania", code: "DE" },
  { name: "Andorra", code: "AD" },
  { name: "Angola", code: "AO" },
  { name: "Anguila", code: "AI" },
  { name: "Antártida", code: "AQ" },
  { name: "Antigua y Barbuda", code: "AQ" },
  { name: "Arabia Saudí", code: "AG" },
  { name: "Argelia", code: "DZ" },
  { name: "Argentina", code: "AR" },
  { name: "Armenia", code: "AM" },
  { name: "Aruba", code: "AW" },
  { name: "Australia", code: "AU" },
  { name: "Austria", code: "AT" },
  { name: "Azerbaiyán", code: "AZ" },
  { name: "Bahamas", code: "BS" },
  { name: "Bahréin", code: "BH" },
  { name: "Bangladesh", code: "BD" },
  { name: "Barbados", code: "BB" },
  { name: "Bélgica", code: "BE" },
  { name: "Belice", code: "BZ" },
  { name: "Benín", code: "BJ" },
  { name: "Bermudas", code: "BM" },
  { name: "Bielorrusia", code: "BY" },
  { name: "Bolivia", code: "BO" },
  { name: "Bosnia y Herzegovina", code: "BA" },
  { name: "Botsuana", code: "BW" },
  { name: "Bouvet, Isla", code: "BV" },
  { name: "Brasil", code: "BR" },
  { name: "Brunéi", code: "BN" },
  { name: "Bulgaria", code: "BG" },
  { name: "Burkina Faso", code: "BF" },
  { name: "Burundi", code: "BI" },
  { name: "Bután", code: "BT" },
  { name: "Cabo Verde", code: "CV" },
  { name: "Caimán, Islas", code: "KY" },
  { name: "Camboya", code: "KH" },
  { name: "Camerún", code: "CM" },
  { name: "Canadá", code: "CA" },
  { name: "Centroafricana, República", code: "CF" },
  { name: "Cocos, Isla de (Keeling)", code: "CC" },
  { name: "Colombia", code: "CO" },
  { name: "Comoras", code: "KM" },
  { name: "Congo", code: "CG" },
  { name: "Congo, República Democrática", code: "CD" },
  { name: "Cook, Islas", code: "CK" },
  { name: "Corea del Norte", code: "KP" },
  { name: "Corea del Sur", code: "KR" },
  { name: "Costa de Marfil", code: "CI" },
  { name: "Costa Rica", code: "CR" },
  { name: "Croacia", code: "HR" },
  { name: "Cuba", code: "CU" },
  { name: "Chad", code: "TD" },
  { name: "Checa, República", code: "CZ" },
  { name: "Chile", code: "CL" },
  { name: "China", code: "CN" },
  { name: "Chipre", code: "CY" },
  { name: "Curaçao", code: "CW" },
  { name: "Dinamarca", code: "DK" },
  { name: "Dominica", code: "DM" },
  { name: "Dominicana, República", code: "DO" },
  { name: "Ecuador", code: "EC" },
  { name: "Egipto", code: "EG" },
  { name: "Emiratos Árabes Unidos", code: "AE" },
  { name: "Eritrea", code: "ER" },
  { name: "Eslovaquia", code: "SK" },
  { name: "Eslovenia", code: "SI" },
  { name: "España", code: "ES" },
  { name: "Estados Unidos de América", code: "US" },
  { name: "Estonia", code: "EE" },
  { name: "Etiopía", code: "ET" },
  { name: "Feroe, Islas", code: "FO" },
  { name: "Filipinas", code: "PH" },
  { name: "Finlandia", code: "FI" },
  { name: "Fiyi", code: "FJ" },
  { name: "Francia", code: "FR" },
  { name: "Gabón", code: "GA" },
  { name: "Gambia", code: "GM" },
  { name: "Georgia", code: "GE" },
  { name: "Georgia del Sur y las Islas Sandwich del Sur", code: "GS" },
  { name: "Ghana", code: "GH" },
  { name: "Gibraltar", code: "GI" },
  { name: "Granada", code: "GD" },
  { name: "Grecia", code: "GR" },
  { name: "Groenlandia", code: "GL" },
  { name: "Guam", code: "GU" },
  { name: "Guatemala", code: "GT" },
  { name: "Guernesey", code: "GG" },
  { name: "Guinea", code: "GN" },
  { name: "Guinea ecuatorial", code: "GQ" },
  { name: "Guinea-Bisáu", code: "GW" },
  { name: "Guyana", code: "GY" },
  { name: "Haití", code: "HT" },
  { name: "Heard y McDonald, Islas", code: "HM" },
  { name: "Honduras", code: "HN" },
  { name: "Hong Kong", code: "HK" },
  { name: "Hungría", code: "HU" },
  { name: "India", code: "IN" },
  { name: "Indonesia", code: "ID" },
  { name: "Irán", code: "IR" },
  { name: "Iraq", code: "IQ" },
  { name: "Irlanda", code: "IE" },
  { name: "Isla de Man", code: "IM" },
  { name: "Islandia", code: "IS" },
  { name: "Israel", code: "IL" },
  { name: "Italia", code: "IT" },
  { name: "Jamaica", code: "JM" },
  { name: "Japón", code: "JP" },
  { name: "Jersey", code: "JE" },
  { name: "Jordania", code: "JO" },
  { name: "Kazajistán", code: "KZ" },
  { name: "Kenia", code: "KE" },
  { name: "Kirguistán", code: "KG" },
  { name: "Kiribati", code: "KI" },
  { name: "Kuwait", code: "KW" },
  { name: "Laos", code: "LA" },
  { name: "Lesoto", code: "LS" },
  { name: "Letonia", code: "LV" },
  { name: "Líbano", code: "LB" },
  { name: "Liberia", code: "LR" },
  { name: "Libia", code: "LY" },
  { name: "Liechtenstein", code: "LI" },
  { name: "Lituania", code: "LT" },
  { name: "Luxemburgo", code: "LU" },
  { name: "Macao", code: "MO" },
  { name: "Macedonia", code: "MK" },
  { name: "Madagascar", code: "MG" },
  { name: "Malasia", code: "MY" },
  { name: "Malawi", code: "MW" },
  { name: "Maldivas", code: "MV" },
  { name: "Malí", code: "ML" },
  { name: "Malta", code: "MT" },
  { name: "Malvinas, Islas", code: "FK" },
  { name: "Marianas del Norte, Islas", code: "MP" },
  { name: "Marruecos", code: "MA" },
  { name: "Marshall, Islas", code: "MH" },
  { name: "Mauricio", code: "MU" },
  { name: "Mauritania", code: "MR" },
  { name: "Mayotte", code: "YT" },
  { name: "Menores Alejadas de los EEUU", code: "UM" },
  { name: "México", code: "MX" },
  { name: "Micronesia", code: "FM" },
  { name: "Moldavia", code: "MD" },
  { name: "Mónaco", code: "MC" },
  { name: "Mongolia", code: "MN" },
  { name: "Montenegro", code: "ME" },
  { name: "Montserrat", code: "MS" },
  { name: "Mozambique", code: "MZ" },
  { name: "Myanmar", code: "MM" },
  { name: "Namibia", code: "NA" },
  { name: "Nauru", code: "NR" },
  { name: "Navidad, Isla", code: "CX" },
  { name: "Nepal", code: "NP" },
  { name: "Nicaragua", code: "NI" },
  { name: "Níger", code: "NE" },
  { name: "Nigeria", code: "NG" },
  { name: "Niue, Isla", code: "NU" },
  { name: "Norfolk, Isla", code: "NF" },
  { name: "Noruega", code: "NO" },
  { name: "Nueva Caledonia", code: "NC" },
  { name: "Nueva Zelanda", code: "NZ" },
  { name: "Océano Índico, Territorio Británico del", code: "IO" },
  { name: "Omán", code: "OM" },
  { name: "Países Bajos", code: "NL" },
  { name: "Países Bajos, Bonaire", code: "BQ" },
  { name: "Pakistán", code: "PK" },
  { name: "Palau", code: "PW" },
  { name: "Panamá", code: "PA" },
  { name: "Papúa Nueva Guinea", code: "PG" },
  { name: "Paraguay", code: "PY" },
  { name: "Perú", code: "PE" },
  { name: "Pitcairn", code: "PN" },
  { name: "Polinesia Francesa", code: "PF" },
  { name: "Polonia", code: "PL" },
  { name: "Portugal", code: "PT" },
  { name: "Puerto Rico", code: "PR" },
  { name: "Qatar", code: "QA" },
  { name: "Reino Unido", code: "GB" },
  { name: "Ruanda", code: "RW" },
  { name: "Rumanía", code: "RO" },
  { name: "Rusia", code: "RU" },
  { name: "Salomón, Islas", code: "SB" },
  { name: "Salvador, El", code: "SV" },
  { name: "Samoa Occidental", code: "WS" },
  { name: "Samoa Americana", code: "AS" },
  { name: "San Cristóbal y Nieves", code: "KN" },
  { name: "San Marino", code: "SM" },
  { name: "San Martín", code: "SX" },
  { name: "San Pedro y Miquelón", code: "PM" },
  { name: "San Vicente y las Granadinas", code: "VC" },
  { name: "Santa Elena", code: "SH" },
  { name: "Santa Lucía", code: "LC" },
  { name: "Santo Tomé y Príncipe", code: "ST" },
  { name: "Senegal", code: "SN" },
  { name: "Serbia", code: "RS" },
  { name: "Seychelles", code: "SC" },
  { name: "Sierra Leona", code: "SL" },
  { name: "Singapur", code: "SG" },
  { name: "Siria", code: "SY" },
  { name: "Somalia", code: "SO" },
  { name: "Sri Lanka", code: "LK" },
  { name: "Suazilandia", code: "SZ" },
  { name: "Sudáfrica", code: "ZA" },
  { name: "Sudán", code: "SD" },
  { name: "Sudán del Sur", code: "SS" },
  { name: "Suecia", code: "SE" },
  { name: "Suiza", code: "CH" },
  { name: "Surinam", code: "SR" },
  { name: "Tailandia", code: "TH" },
  { name: "Taiwán", code: "TW" },
  { name: "Tanzania (República Unida de)", code: "TZ" },
  { name: "Tayikistán", code: "TJ" },
  { name: "Territorio Palestino Ocupado", code: "PS" },
  { name: "Tierras Australes Francesas", code: "TF" },
  { name: "Timor Oriental", code: "TL" },
  { name: "Togo", code: "TG" },
  { name: "Tokelau, Islas", code: "TK" },
  { name: "Tonga", code: "TO" },
  { name: "Trinidad y Tobago", code: "TT" },
  { name: "Túnez", code: "TN" },
  { name: "Turcas y Caicos, Islas", code: "TC" },
  { name: "Turkmenistán", code: "TM" },
  { name: "Turquía", code: "TR" },
  { name: "Tuvalu", code: "TV" },
  { name: "Ucrania", code: "UA" },
  { name: "Uganda", code: "UG" },
  { name: "Uruguay", code: "UY" },
  { name: "Uzbekistán", code: "UZ" },
  { name: "Vanuatu", code: "VU" },
  { name: "Vaticano, Ciudad del", code: "VA" },
  { name: "Venezuela", code: "VE" },
  { name: "Vietnam", code: "VN" },
  { name: "Vírgenes Británicas, Islas", code: "VG" },
  { name: "Vírgenes de los EEUU, Islas", code: "VI" },
  { name: "Wallis y Futuna, Islas", code: "WF" },
  { name: "Yemen", code: "YE" },
  { name: "Yibuti", code: "DJ" },
  { name: "Zambia", code: "ZM" },
  { name: "Zimbabue", code: "ZW" },
];

export default countries;
