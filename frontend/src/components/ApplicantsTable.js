import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import axios from "axios";

const ApplicantsTable = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    getApplications();
    // console.log("useEffect");
  }, []);

  const getApplications = async () => {
    const res = await axios.get(
      "http://localhost:1337/api/applicants?populate=*"
    );
    // console.log(res.data.data);

    setApplications(res.data.data);
  };

  return (
    <div style={{ background:"white", height: 400, width: "70%", margin:"0 auto" }}>
      <DataGrid 
    
        columns={[
          { field: "id", headerName: "ID", width: 70 },
          { field: "Name", headerName: "First name", width: 130 },
          { field: "Surname", headerName: "Surname", width: 130 },
          {
            field: "Number",
            headerName: "Number",
            width: 90,
          },
          {
            field: "Email",
            headerName: "E-Mail",
            sortable: false,
            width: 160,
            // valueGetter: (params) =>
            //   `${params.row.Name || ""} ${params.row.Surname || ""}`,
          },

          {
            field: "Position",
            headerName: "Position",
            width: 90,
          },

          {
            field: "Date",
            headerName: "Date",
            width: 190,
            type: 'dateTime',
            valueGetter: ({ value }) => value && new Date(value), 

          },

          {
            field: "Cv",
            headerName: "CV (Resume)",
            sortable: false,
            width: 120,
            renderCell: (params) => (
              <a href={"http://localhost:1337" + params.value}>CV</a>
            ),
          },
        ]}
        rows={applications?.map((apps) => ({
          id: apps.id,
          Name: apps.attributes.Name,
          Surname: apps.attributes.Surname,
          Email: apps.attributes.Email,
          Number: apps.attributes.Number,
          Position: apps.attributes.Position,
          Cv: apps.attributes.Cv.data[0].attributes.url,
          Date: apps.attributes.publishedAt,

          //<a href ={"http://localhost:1337" + apps.attributes.Cv.data[0].attributes.url}>CV</a>
        }))}
        pageSize={5}
        rowsPerPageOptions={[5]}

        checkboxSelection
      />
    </div>
  );
};

export default ApplicantsTable;
