import React, { useState } from 'react'
import { Box } from "@mui/material";
import { Sidebar } from '../../../components'

const diario = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        
        <div>
            <Sidebar
                drawerWidth="250px"
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />
            <Box flexGrow={1}>
                <h1 className='text-black'>Daily</h1>
            </Box>
        </div>
    )
}

export default diario