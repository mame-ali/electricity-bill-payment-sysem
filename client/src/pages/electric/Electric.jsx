import React, { useState} from 'react'
import DataTable from '../../components/dataTable/DataTable';
import Add from '../../components/add/Add'

const Electric = () => {
  const [open, setOpen] = useState(false);
  

    const handleAddUserClick = () => {
    console.log("object");
    setOpen(true);
  };


  return (
    <div>

      <div className="info centercontent">
      <h1>Electric</h1>
        <button className="btn btn-primary" onClick={handleAddUserClick}>Add New User</button>
      </div>
      <DataTable first="users/electricmeters" />
         {open &&<Add name= 'users' columns={columns} setOpen={setOpen} />}
    </div>
  )
}

export default Electric
