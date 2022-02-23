import axios from "axios";
import { useContext, useRef } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./register.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import styled from "styled-components";
const Error = styled.span`
  color: red;
`;

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const history = useHistory();const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL,})
  const {user, isFetching, error, dispatch} = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();



  const handleFinish = async (e) => {
    e.preventDefault();
    setEmail(emailRef.current.value);
    setPassword(passwordRef.current.value);
    setUsername(usernameRef.current.value);
    try {
      await axiosInstance.post("auth/register", { email,username, password },error);
      history.push("/login");
    } catch (err) {
      console.log(err)
    }
  };
  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://cdn.discordapp.com/attachments/917547212475621456/917549556776972348/picturetopeople.org-fecc53d30118fdbcf4da0014272cc57b264b9ad433fa39595a.png"
            alt=""
          />
           <Link to="/login">
           <button className="loginButton" 
            >Sign In</button>

           </Link>
           
      
     
        </div>
      </div>
      <div className="container">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        
          
          <form className="input" onSubmit={handleFinish}> 
            <input type="email" placeholder="email address"  required    minLength="6" ref={emailRef}  />
            <input type="username" placeholder="username" ref={usernameRef} required />
            <input type="password" placeholder="password" ref={passwordRef}  required/>
            <button className="registerButton" type="submit" disabled={isFetching} >
            {isFetching ? "Please wait..." : "Get Started"}
            </button>
            {error && <Error >Wrong password or username, try again...</Error>}
            <span>
           
         
          </span>
          </form>
      
      </div>
    </div>
  );
}
