// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import validation from "./LoginValidation";

// function Login() {
//   const [values, setValues] = useState({
//     email: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   const handleInput = (event) => {
//     setValues((prev) => ({
//       ...prev,
//       [event.target.name]: event.target.value,
//     }));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setErrors(validation(values));
    
//     if (Object.keys(errors).length === 0) {
//       // Make API call to login
//       axios
//         .post("http://localhost:3308/login", values)
//         .then((res) => {
//           console.log("Login successful:", res.data.message);
//           navigate("/dashboard");  
//         })
//         .catch((err) => console.error("Login error:", err));
//     }
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
//       <div className="bg-white p-3 rounded w-25">
//         <h2>Sign-In</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="email"><strong>Email</strong></label>
//             <input
//               type="email"
//               name="email"
//               placeholder="Enter email"
//               className="form-control rounded-0"
//               onChange={handleInput}
//             />
//             {errors.email && <span className="text-danger">{errors.email}</span>}
//           </div>
//           <div className="mb-3">
//             <label htmlFor="password"><strong>Password</strong></label>
//             <input
//               type="password"
//               name="password"
//               placeholder="Enter password"
//               className="form-control rounded-0"
//               onChange={handleInput}
//             />
//             {errors.password && <span className="text-danger">{errors.password}</span>}
//           </div>
//           <button type="submit" className="btn btn-success w-100 rounded-0">Log in</button>
//           <Link to="/signup" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Create Account</Link>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;


import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import validation from "./LoginValidation";

function Login() {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/dashboard"); 
    }
  }, [navigate]);

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validation(values));
    setApiError("");

    if (Object.keys(validation(values)).length === 0) {
      axios
        .post("http://localhost:3308/login", values)
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(values));
          console.log("Login successful:", res.data.message);
          navigate("/dashboard");
        })
        .catch((err) => {
          setApiError(err.response?.data?.error || "An error occurred during login.");
        });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Sign-In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email"><strong>Email</strong></label> 
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              className="form-control rounded-0"
              onChange={handleInput}
            />
            {errors.email && <span className="text-danger">{errors.email}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="password"><strong>Password</strong></label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              className="form-control rounded-0"
              onChange={handleInput}
            />
            {errors.password && <span className="text-danger">{errors.password}</span>}
          </div>
          {apiError && <div className="text-danger">{apiError}</div>}
          <button type="submit" className="btn btn-success w-100 rounded-0">Log in</button>
          <Link to="/signup" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Create Account</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
