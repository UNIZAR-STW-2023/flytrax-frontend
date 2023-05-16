/*
  File's name: /map/index.jsx
  Authors: Paul Huszak & Guillermo Cánovas 
  Date: 16/05/2023
*/

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), {
  ssr: false, // Disable server-side rendering for this component
});

export default Map;
