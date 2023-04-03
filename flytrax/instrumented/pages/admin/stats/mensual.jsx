import React, { useState } from 'react'
import { Sidebar } from '../../../components'

const mensual = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        
        <div>
            <h1 className='text-black'>Monthly</h1>
            <Sidebar
                drawerWidth="250px"
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />
        </div>
    )
}

export default mensual