import React, { useEffect, useState, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { grey } from "@mui/material/colors";
import { salidasData } from "../assets/dummy/dummyDatos";

const PanelesCard = () => {
  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);

  const columns = useMemo(
    () => [
      { field: "_id", headerName: "Id", width: 200 },
      { field: "hora", headerName: "Hora", width: 200 },
      { field: "destino", headerName: "Destino", width: 200 },
      { field: "vuelo", headerName: "Vuelo", width: 200 },
      { field: "puerta", headerName: "Puerta", width: 200 },
      { field: "observaciones", headerName: "Observaciones", width: 200 },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rowId]
  );

  return (
    <Box sx={{ height: 750, width: "100%" }}>
      <DataGrid
        rows={salidasData}
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
              theme.palette.mode === "light" ? grey[200] : grey[900],
          },
        }}
        //onCellEditCommit={(params:any) => setRowId(params.id)}
      />
    </Box>
  );
};

export default PanelesCard;
