import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import './login.css'

function Login(props) {

    const navigate = useNavigate();
    const [loginForm, setloginForm] = useState({
      email: "",
      password: ""
    })

    function logMeIn(event) {
      axios({
        method: "POST",
        url:"/",
        data:{
          email: loginForm.email,
          password: loginForm.password
         },
         headers:{
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
             Accept: 'application/json'
         }
      })
      .then((response) => {
        props.setToken(response.data.access_token)
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          console.error("ERROR")
          navigate('/')
          return;
          }
      })

      setloginForm(({
        email: "",
        password: ""}))

      event.preventDefault()
      navigate('/profile')

    }

    function handleChange(event) { 
      const {value, name} = event.target
      setloginForm(prevNote => ({
          ...prevNote, [name]: value})
      )}

    return (
      <div>
      <div className="login-box">
      <h2>Login</h2>
      <form>
        <div className="user-box">
          <input onChange={handleChange}
                 type="email" name="email"
                 text={loginForm.email}
                 value={loginForm.email} />
          <label>Username</label>
        </div>
        <div className="user-box">
          <input onChange={handleChange}
                 type="password" name="password"
                 text={loginForm.password}
                 value={loginForm.password}
                 />
          <label>Password</label>
        </div>
        <a href="#">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <button onClick={logMeIn}>Login</button>
        </a>
      </form>
      <p id="signup-link"> Don't have an account? <Link to='/signup'>Sign up here.</Link></p>
    </div>

      </div>
    );
}

export default Login;