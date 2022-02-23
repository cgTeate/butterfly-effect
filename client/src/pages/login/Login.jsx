import { useContext, useState, useSelector } from "react";
import { login } from "../../authContext/apiCalls";
import { AuthContext } from "../../authContext/AuthContext";
import "./login.scss";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ExternalLink } from 'react-external-link';


const Error = styled.span`
  color: red;
`;
// const CircularProgress  = styled.span`
// color = white ;
// size=20px;
// `;


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const { dispatch } = useContext(AuthContext);
  const { isFetching, error, dispatch} = useContext(AuthContext);
  
  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password }, dispatch);
  };
  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://cdn.discordapp.com/attachments/917547212475621456/917549556776972348/picturetopeople.org-fecc53d30118fdbcf4da0014272cc57b264b9ad433fa39595a.png"
            alt=""
          />
        </div>
      </div>
      <div className="container">
        <form onSubmit={handleLogin}>
          <h1>Sign In</h1>
          <input
            type="email"
            required
      
            placeholder="Email or phone number"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            minLength="6"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="loginButton" type="submit"  disabled={isFetching} >
          {isFetching ? "Please wait..." : "Log In"}
          </button>
          {error && <Error >Wrong password or username, try again...</Error>}
          <span>
            New to ButterflyEffect?
            <Link className ="cc" to="/register">
   
            <b  > Sign up now.</b>
           </Link>
         
          </span>
          
          <small>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.
           {/* set Classname to link to getrid of the purple link */}
            <ExternalLink className ="link" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
            <b > Learn more</b>.
            </ExternalLink>
   
         

        
          </small>
        </form>
       
      </div>
    </div>
  );
}
