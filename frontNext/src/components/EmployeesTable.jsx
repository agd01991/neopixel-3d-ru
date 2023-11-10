import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function EmployeesTable() {
  const [employees, setEmployees] = useState([]);
  const [editEmployees, setEditEmployees] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios.get('http://localhost:3000/api/employees')
      .then((response) => {
        setEmployees(response.data.employees);
        console.log(response);
      })
      .catch((error) => {
        console.error('Failed to fetch Employees:', error);
      });
  };

  const deleteEmployees = (employeesId) => {
    axios
      .delete(`http://localhost:3000/api/employees/${employeesId}`)
      .then((response) => {
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employees) => employees.id !== employeesId)
        );
        console.log(response);
      })
      .catch((error) => {
        console.error('Failed to delete Employees:', error);
      });
  };

  const editEmployeesClick = (employees) => {
    setEditEmployees(employees);
  };

  const updateEmployees = () => {
    axios
      .put(`http://localhost:3000/api/employees/${editEmployees.id}`, editEmployees)
      .then((response) => {
        setEmployees((prevEmployees) =>
          prevEmployees.map((employees) => (employees.id === editEmployees.id ? editEmployees : employees))
        );
        setEditEmployees(null);
        console.log(response);
      })
      .catch((error) => {
        console.error('Failed to update Employees:', error);
      });
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Date</th>
          <th>Img</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employees) =>
          editEmployees !== null && editEmployees.id === employees.id ? (
            <tr key={editEmployees.id}>
              <td>{editEmployees.id}</td>
              <td>
                <input
                  type="text"
                  value={editEmployees.name}
                  onChange={(e) =>
                    setEditEmployees({ ...editEmployees, name: e.target.value })
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={editEmployees.email}
                  onChange={(e) =>
                    setEditEmployees({ ...editEmployees, email: e.target.value })
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={editEmployees.username}
                  onChange={(e) =>
                    setEditEmployees({ ...editEmployees, username: e.target.value })
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={editEmployees.pasword}
                  onChange={(e) =>
                    setEditEmployees({ ...editEmployees, pasword: e.target.value })
                  }
                />
              </td>
              <td>
                <button onClick={updateEmployees}>Save</button>
                <button onClick={() => setEditEmployees(null)}>Cancel</button>
              </td>
            </tr>
          ) : (
            <tr key={Employees.id}>
              <td>{Employees.id}</td>
              <td>{Employees.name}</td>
              <td>{Employees.email}</td>
              <td>{Employees.username}</td>
              <td>{Employees.pasword}</td>
              <td>
                <button onClick={() => deleteEmployees(Employees.id)}>Delete</button>
                <button onClick={() => editEmployeesClick(Employees)}>Edit</button>
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}
