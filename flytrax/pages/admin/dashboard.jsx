import React, { useState } from "react";
import { Sidebar } from "../../components";

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="max-w-[1400px] m-auto w-full my-24">
      <h1 className="text-black">Dashboard</h1>
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </div>
  );
}

export default Dashboard;
