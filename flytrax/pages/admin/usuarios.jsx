import React, { useState } from 'react'
import { Sidebar } from '../../components'
import { AdminUsuarios } from '../../components';

const usuarios = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        
        <div className="max-w-[1400px] m-auto w-full my-24">
            <h1 className='text-black'>Admin users</h1>
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />
            <AdminUsuarios />
        </div>
    )
}

export default usuarios