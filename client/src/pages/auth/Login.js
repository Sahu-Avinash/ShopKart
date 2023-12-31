import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate ,useLocation } from "react-router-dom";
// import "../../styles/register.css";
import { useAuth } from "../../context/auth";
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import './login.css'


const Login = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth,setAuth] = useAuth()
 
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if ( res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
            ...auth,
            user: res.data.user,
            token:res.data.token,
        })
        localStorage.setItem('auth',JSON.stringify(res.data));
        navigate(location.state || "/");
      } 
     
      else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Something went wrong`);
    }
  };
  return (
    <Layout title={`Login in ShopKart`}>
      <div className="form-container ">
        <h1>Login page</h1>
        <form onSubmit={handleSubmit}>
          
          <div className="mb-3">
          <MailOutlineIcon/>
            <input
          
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="example@gmail.com"
              required
            />
            <div id="emailHelp" className="form-text"></div>
          </div>

          <div className="mb-3">
            <LockOpenIcon/>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter password"
              required
            />
          </div>
         
        
            

        

          <div className="mb-3">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
         </div>

         <button type="button" className="btn btn-primary" onClick={()=>{navigate('/forgot-password')}}>
            Forgot Password
          </button>
          
        </form>
      </div>
    </Layout>
  );
};

export default Login;
