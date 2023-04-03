import React, { useState } from 'react'
import { Sidebar } from '../../../components'

const dashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        
        <div>
            <h1 className='text-black'>Dashboard</h1>
            <Sidebar
                drawerWidth="250px"
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />
        </div>
    )
}

export default dashboard