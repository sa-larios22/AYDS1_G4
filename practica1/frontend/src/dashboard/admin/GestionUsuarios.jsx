import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { UserService } from "../../service/userService";
import { HomeLayout } from "../../components";

export const GestionUsuarios = () => {
  const [users, setUsers] = useState([
    { id: 1, username: "Juan", role: "Admin", isActive: true },
    { id: 2, username: "Ana", role: "User", isActive: false },
    { id: 3, username: "Carlos", role: "User", isActive: true },
  ]);

  const userService = UserService();
  
  useEffect(() => {
    const getUsers = async () => {
      const data = await userService.getUsers(10, 5);
      if (!data) {
        return;
      }
      console.log(data);
      setUsers(data);
    }
    getUsers();
  }, []);
  // getUsers();

  const handleDelete = async (id) => {
    const response = await userService.deleteUser(id);
    if (!response) {
      return;
    }
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  const columns = [
    { field: "name", headerName: "Nombre", width: 200 },
    { field: "username", headerName: "Usuario", width: 200 },
    {field: "role", headerName: "Rol", width: 200},
    {
      field: "action",
      headerName: "",
      width: 200,
      renderCell: (params) => (
        <IconButton
          color="error"
          onClick={() => handleDelete(params.id)}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <HomeLayout>
      <Box sx={{ height: 400, width: 900, marginX: "auto", mt: 10 }}>
        <h2>Gestión de usuarios</h2>
        <DataGrid sx={{width: '100%', maxWidth: '802px'}}
          rows={users}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </Box>
    </HomeLayout>
  );
};

