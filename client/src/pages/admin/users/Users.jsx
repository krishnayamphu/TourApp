import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { FilterMatchMode } from "primereact/api";
import { AuthContext } from "../../../context/AuthContext";
import { getUsers } from "../../../services/UserService";

import { Toolbar } from "primereact/toolbar";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Divider } from "primereact/divider";

export default function Users() {
  const API = import.meta.env.VITE_API_URL;
  const [users, setUsers] = useState(null);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    email: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [loading, setLoading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const dateTemplate = (rowData) => {
    return format(new Date(rowData.createdAt), "PPP");
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getUsers();
      setUsers(res.data.users);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const imageBodyTemplate = (user) => {
    return (
      <img
        src={`${API}/uploads/avatars/${user.avatar}`}
        alt={user.name}
        className="w-16 shadow-2 rounded"
      />
    );
  };

  return (
    <div className="p-4">
      <h1>All Users</h1>
      <div className="flex justify-content-end">
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </IconField>
      </div>
      <Divider />

      <DataTable
        value={users}
        stripedRows
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        filters={filters}
        filterDisplay="row"
        loading={loading}
        globalFilterFields={["name", "email"]}
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column field="id" sortable header="SN"></Column>
        <Column field="name" sortable header="Name"></Column>
        <Column header="Image" body={imageBodyTemplate}></Column>
        <Column field="email" header="Email"></Column>
        <Column field="role" header="Role"></Column>
        <Column header="Created At" body={dateTemplate}></Column>
      </DataTable>
    </div>
  );
}
