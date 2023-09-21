  import React, { useEffect, useState, useRef } from 'react';
  import { DataGrid, GridToolbar } from '@mui/x-data-grid';
  import axios from '../../utility/axios';
  import Show from "../add/Show";
  import { saveAs } from 'file-saver';
  import { useReactToPrint } from 'react-to-print';
  import './dataTable.css'; // add the CSS file

  import { redirect, useNavigate } from 'react-router-dom';





  export default function DataTable({ first, name }) {
const [deleted, setDeleted] = useState(false);
  const [reload, setReload] = useState(false);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState([]);
  const [filteredUser, setFilteredUser] = useState([]);
  const componentRef = useRef(null);
  const [selectedRowData, setSelectedRowData] = useState(null); // State to hold the single-clicked row data
  let [alertdata, setAlertdata] = useState({});
    const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);


  // action column definition with view and delete functionality
  const actionColumn = {
    field: 'action',
    headerName: 'Action',
    width: 150,
    renderCell: (params) => {
      const onClickView = () => {
        setSelectedRowData(params.row); // Set the selectedRowData state to the clicked row data
        handleAddUserClick(); // Open the Show component
      };

      const onClickDelete = () => {
   
       handleDelete(`${params.row.user_id}`);
      };

      return (
        <div className="cellAction d-block">
          <div className="viewButton btn btn-secondary" onClick={onClickView}>
            View
          </div>
          <div className="deleteButton btn btn-danger" onClick={onClickDelete}>
            updateUser
          </div>
        </div>
      );
    },
  };



    const fetchData = async () => {
      try {
        const response = await axios.get(first);
        console.log(response.data.results)
        setUser(response.data.results);
        setFilteredUser(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    const handleDelete = async (id) => {
      const data = {
        user_id: id,
        org_role_id: 2      };
    const confirmed = window.confirm(`Are you sure? \n you want to  update ${first}`);
    if (confirmed) {
      const response = await axios.put('users/assignrole', data);
      console.log(response);
     
    } else {
      alert('delete canceled');
    }
  };


      useEffect(() => {
      if (deleted) {
        setDeleted(false); // Reset the deleted state after it triggers a state update
        setReload(true); // Trigger a reload of the data to reflect the deletion
      }
      }, [deleted]);

      useEffect(() => {
      if (reload) {
        fetchData(); // Refetch the data to update the rows after deletion
        setReload(false); // Reset the reload state after it triggers a state update
      }
      }, [reload]);

    // columns define for table
    const columns = user.length > 0
      ? Object.keys(user[0]).map((key) => ({
          field: key,
          headerName: key.charAt(0).toUpperCase() + key.slice(1),
          flex: 1, // set the flex property of each column to 1
        }))
      : [];

    //row data define for table
    const rows = filteredUser.map((us) => ({
      ...us,
    }));

    const handleAddUserClick = () => {
      setOpen(true);
    };

    const handleCloseAddUser = () => {
      setOpen(false);
    };

    return (
      <>
      <div className='centerTable'>
        <div ref={componentRef}>
    <DataGrid
        rows={rows}
        columns={columns.concat(actionColumn)}
        autoHeight
        columnBuffer={0}
        getRowId={(rows) => rows.user_id} // Specify the unique identifier using user_id
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 300 },
          },
        }}
        pagination
        pageSize={20}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
        className="dataTable"/>
         
          {open && (
            <Show name={first} columns={columns} setOpen={setOpen} rowData={selectedRowData} />
          )}
        </div>
      
        </div>
      </>
    );
  }
