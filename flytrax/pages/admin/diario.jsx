import React, { useState } from "react";
import { Box } from "@mui/material";
import { Sidebar } from "../../components";

function Diario() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="max-w-[1400px] m-auto w-full my-24">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1}>
        <h1 className="text-black">Daily</h1>
      </Box>
    </div>
  );
}

export default Diario;
