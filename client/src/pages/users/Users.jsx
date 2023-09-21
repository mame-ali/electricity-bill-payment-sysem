import React, { useState } from "react";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import "./users.css";
const Users = () => {
	const [open, setOpen] = useState(false);
	return (
		<div className="wrapper">
			<h1>Electric</h1>
			<DataTable first="users/users" />
			{open && <Add name="users" columns={columns} setOpen={setOpen} />}
		</div>
	);
};

export default Users;
