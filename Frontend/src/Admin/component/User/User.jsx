import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import Modal2 from '../../../components/Modal2/Modal2';
import Modal from '../../../components/Modal/Modal';
import Switch from '@mui/material/Switch';

export default function User() {
  const [users, setUsers] = useState([
    { id: 123, name: 'Thai Thi Nhung', status: 'Active' }
    // ... other users
  ]);
  const [userInfo,setUserInfo] = useState(JSON.parse(localStorage.getItem('user-info')));
  const [user, setUser] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [isUpdateUser, setIsUpdateUser] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/users?page=${currentPage}&limit=10`, {
      headers: {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiMjA1MjE3MjZAZ20udWl0LmVkdS52biIsInN1YiI6IjIwNTIxNzI2QGdtLnVpdC5lZHUudm4iLCJleHAiOjE3MDY5MjY0MDV9.PVggJprRk7nbTcOCu54LfxKzjtHF5h9kT2aO0hABHy8`,
      },
    })
      .then(response => {
        if (response.data && response.data.users) {
          setUsers(response.data.users);
          setTotalPages(response.data.totalPages);
        } else {
          console.error('Empty or invalid response data:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, [currentPage]);
  

  const handleUpdateUser = (id, name, status) => {
    setIsUpdateUser(!isUpdateUser);
    const updatedUser = { id, name, status };
    setUser(updatedUser);
    setSwitchChecked(status === 'Active');
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/users/delete/${id}`)
      .then(response => axios.get(`http://localhost:8080/api/v1/users?page=${currentPage}&size=5`))
      .then(response => {
        setUsers(response.data.users);
        setTotalPages(response.data.totalPages);
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      })
      .finally(() => {
        setOpenModal(false);
      });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleShowUserDetails = (id) => {
    if (selectedUserDetails && selectedUserDetails.id === id) {
      return;
    }

    const userDetails = users.find(user => user.id === id);

    if (userDetails) {
      setSelectedUserDetails(userDetails);
    } else {
      console.error('Không tìm thấy thông tin người dùng.');
    }
  };
  
  const startPage = currentPage <= 1 ? 0 : currentPage - 1;
  const endPage = currentPage + 1 >= totalPages ? totalPages - 1 : currentPage + 1;
  const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <>
      <div className="Table">
        <h1 className="tile-admin">User</h1>
        <TableContainer component={Paper} style={{ boxShadow: "0px 13px 20px 0px #80808029" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell align="left">
                    <span
                      style={{ color: switchChecked ? 'green' : 'red', cursor: 'pointer' }}
                      onClick={() => handleShowUserDetails(user.id)}
                    >
                      {user.id}
                    </span>
                  </TableCell>
                  <TableCell align="left">{user.fullname}</TableCell>
                  <TableCell align="left">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ color: switchChecked ? 'green' : 'red' }}>{user.is_active}</span>
                      <div className="edit-button">
                        <Switch
                          checked={switchChecked}
                          onChange={() => handleUpdateUser(user.id, user.fullname, switchChecked ? 'Inactive' : 'Active')}
                          color="primary"
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell align="left">
                    <div className="delbutton">
                      <Button className="delbutton"
                        variant="outlined"
                        color="error"
                        onClick={() => setOpenModal(true)}>
                        <i className="fas fa-trash-alt"></i>
                      </Button>
                      <Modal
                        openModal={openModal}
                        content="Do you want to remove user?"
                        onCancel={() => setOpenModal(false)}
                        onYes={() => handleDelete(user.id)}
                        style={{ left: "0px", backgroundColor: "transparent", color: "black" }}
                      ></Modal>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {selectedUserDetails && (
          <Modal2
            openModal={true}  // Chỉnh sửa thành biến state hoặc logic mở cửa sổ
            content={
              <div>
                <h2>User Details</h2>
                <p>ID: {selectedUserDetails.id}</p>
                <p>Phone Number: {selectedUserDetails.phone_number}</p>
                <p>Address: {selectedUserDetails.address}</p>
                <p>Email: {selectedUserDetails.email}</p>
              </div>
            }
            onCancel={() => setSelectedUserDetails(null)}
            style={{ left: "0px", backgroundColor: "transparent", color: "black" }}
          />
        )}

        <div className="Wrapper-Pagniation">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Previous" onClick={() => handlePageChange(currentPage > 0 ? currentPage - 1 : 0)}>
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              {pageNumbers.map(number => (
                <li className={`page-item ${currentPage === number ? 'active' : ''}`} key={number}>
                  <a className="page-link" href="#" onClick={() => handlePageChange(number)}>
                    {number + 1}
                  </a>
                </li>
              ))}
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Next" onClick={() => handlePageChange(currentPage + 1 < totalPages ? currentPage + 1 : totalPages - 1)}>
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
