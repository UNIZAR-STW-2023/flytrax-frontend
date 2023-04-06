import React, { useState } from 'react'
import { Sidebar } from '../../components'

const index = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="max-w-[1400px] m-auto w-full my-24">
            <div className='text-black'>Página que resuma lo que puede hacer el admin</div>
            <Sidebar
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />
        </div>
    )
}

export default index