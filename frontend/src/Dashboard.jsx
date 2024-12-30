import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");

    // Logout user if the page is refreshed
    useEffect(() => {
      const handleBeforeUnload = () => {
        localStorage.clear();
      };
  
      window.addEventListener("beforeunload", handleBeforeUnload);
  
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }, []);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
    }

  
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:3308/employee");
        setEmployees(response.data);
      } catch (err) {
        setError("Failed to fetch employee data. Please try again later.");
        console.error(err);
      }
    };

    fetchEmployees();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <h1>Welcome to the Dashboard!</h1>
      <p>You are successfully logged in.</p>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="container mt-4">
        <h2>Employee Details</h2>
        {/* <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Salary</th>
              <th>Hire Date</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.position}</td>
                  <td>{employee.salary}</td>
                  <td>{employee.hire_date}</td>
                  <td>{employee.department}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No employee data available
                </td>
              </tr>
            )}
          </tbody>
        </table> */}

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {employees.length > 0 ? (
          <table className="table table-bordered">
            <thead>
              <tr>
                {Object.keys(employees[0]).map((column, idx) => (
                  <th key={idx}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {employees.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(row).map((value, colIndex) => (
                    <td key={colIndex}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data to display</p>
        )}

      </div>

      <button className="btn btn-danger mt-3" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;



