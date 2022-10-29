import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

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
        <h1>Login</h1>
          <form className="login">
            <input onChange={handleChange} 
                  type="email"
                  text={loginForm.email} 
                  name="email" 
                  placeholder="Email" 
                  value={loginForm.email} />
            <input onChange={handleChange} 
                  type="password"
                  text={loginForm.password} 
                  name="password" 
                  placeholder="Password" 
                  value={loginForm.password} />

         <button onClick={logMeIn}>Login</button>

        </form>
        <p>Don't have an account? </p><Link to='/signup'>Sign up here.</Link>
      </div>
    );
}

export default Login;