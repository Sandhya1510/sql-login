// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import validation from "./SignupValidation";

// function Signup() {
//   const [values, setValues] = useState({
//     name: "",
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

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     console.log("Submitting form:", values);
  
//     try {
//       const response = await axios.post("http://localhost:3308/signup", values);
//       localStorage.setItem("user", JSON.stringify(values)); 
//       console.log("Signup successful:", response.data);
//       navigate("/"); 
//     } catch (err) {
//       console.error("Error during signup:", err.response || err);
//       setErrors(err.response?.data?.error || "An error occurred during signup.");
//     }
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
//       <div className="bg-white p-3 rounded w-25">
//         <h2>Sign-Up</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="name"><strong>Name</strong></label>
//             <input
//               type="text"
//               name="name"
//               placeholder="Enter your name"
//               className="form-control rounded-0"
//               onChange={handleInput}
//             />
//             {errors.name && <span className="text-danger">{errors.name}</span>}
//           </div>
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
//           <button type="submit" className="btn btn-success w-100 rounded-0">Sign Up</button>
//           <Link to="/" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Login</Link>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Signup;



import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import validation from "./SignupValidation"; 

function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    const updatedErrors = validation({ ...values, [name]: value });
    setErrors(updatedErrors);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitting form:", values);
  
    try {
      const response = await axios.post("http://localhost:3308/signup", values);
      localStorage.setItem("user", JSON.stringify(values)); 
      console.log("Signup successful:", response.data);
      navigate("/"); 
    } catch (err) {
      console.error("Error during signup:", err.response || err);
      setApiError(err.response?.data?.error || "An error occurred during signup.");
    }
  };
  

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-4 rounded w-25 shadow">
        <h2 className="text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label"><strong>Name</strong></label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="form-control rounded-0"
              value={values.name}
              onChange={handleInput}
            />
            {errors.name && <span className="text-danger">{errors.name}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label"><strong>Email</strong></label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              className="form-control rounded-0"
              value={values.email}
              onChange={handleInput}
            />
            {errors.email && <span className="text-danger">{errors.email}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label"><strong>Password</strong></label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              className="form-control rounded-0"
              value={values.password}
              onChange={handleInput}
            />
            {errors.password && <span className="text-danger">{errors.password}</span>}
          </div>
          {apiError && <div className="text-danger mb-3">{apiError}</div>}
          <button type="submit" className="btn btn-success w-100 rounded-0">Sign Up</button>
          <Link to="/" className="btn btn-default border w-100 mt-3 bg-light rounded-0 text-decoration-none">Login</Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;


