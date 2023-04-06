import React, { useEffect, useState, useMemo } from 'react'
import { Box, Typography } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { grey } from '@mui/material/colors';
import UsersActions from './UsersActions';
import { usersData } from '../../../assets/dummy/dummyData'

const index = () => {

    const [pageSize, setPageSize] = useState(5);
    const [rowId, setRowId] = useState(null);

    const columns = useMemo(
        () => [
            { field: '_id', headerName: 'Id', width: 200 },
            { field: 'username', headerName: 'Username' , editable: true, width: 200  },
            { field: 'email', headerName: 'Email', width: 200  },
            {
                field: 'active',
                headerName: 'Active',
                width: 200,
                type: 'boolean',
                editable: true,
            },
            {
                field: 'actions',
                headerName: 'Actions',
                type: 'actions',
                width: 200,
                renderCell: (params) => (
                    <UsersActions {...{ params, rowId, setRowId }} />
                ),
            },
        ],
        [rowId]
    );

    return (
        <Box sx={{ height: 750, width: '100%' }}>
            <DataGrid
                rows={usersData}
                getRowId={(row) => row._id}
                columns={columns}
                initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 10,
                    },
                },
                }}
                pageSizeOptions={[10]}
                disableRowSelectionOnClick
                getRowSpacing={(params) => ({
                    top: params.isFirstVisible ? 0 : 5,
                    bottom: params.isLastVisible ? 0 : 5,
                })}
                sx={{
                    [`& .${gridClasses.row}`]: {
                        bgcolor: (theme) =>
                        theme.palette.mode === 'light' ? grey[200] : grey[900],
                    },
                }}
                //onCellEditCommit={(params:any) => setRowId(params.id)}
            />
        </Box>
    )
}

export default index