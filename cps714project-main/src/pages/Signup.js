import { useState } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from "axios";
import '../styles/signup.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup(props) {
    const myelement = (
        <p id="signup-link"> Please try again. Password must have a minimum length of 6 and contain lowercase letters, uppercase letters and a number. </p>
    );
    const myelement2 = (
        <p id="signup-link"> Signup Successful! </p>
    );

    const [signUpForm, setSignUpForm] = useState({
      email: "",
      username: "",
      password: "",
      verify_password: "",
      first_name: "",
      last_name: ""
    })
    const toastId = toast.loading("Please wait...")

    function signUp(event) {
      axios({
        method: "POST",
        url:"/signup",
        data:{
          email: signUpForm.email,
          username: signUpForm.username,
          password: signUpForm.password,
          verify_password: signUpForm.verify_password,
          first_name: signUpForm.first_name,
          last_name: signUpForm.last_name,
         }
      })
      .then((response) => {
        ReactDOM.render(myelement2, document.getElementById('boxy'));
        props.setToken(response.data.access_token)

      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          ReactDOM.render(myelement, document.getElementById('boxy'));
          }
      })

      setSignUpForm(({
        email: "",
        username: "",
        password: "",
        verify_password: "",
        first_name: "",
        last_name: ""}))

      event.preventDefault()
    }

    function handleChange(event) {
      const {value, name} = event.target
      setSignUpForm(prevNote => ({
          ...prevNote, [name]: value})
      )}

    return (
      <div>
      <div className="login-box">
      <h2>Signup</h2>
      <form>

        <div id="boxy"> </div>
        <div className="user-box">
          <input onChange={handleChange}
                 type="text" name="first_name"
                 text={signUpForm.first_name}
                 value={signUpForm.first_name}
                 required="" />
          <label>First Name</label>
        </div>


        <div className="user-box">
          <input onChange={handleChange}
                 type="text" name="last_name"
                 text={signUpForm.last_name}
                 value={signUpForm.last_name}
                 required="" />
          <label>Last Name</label>
        </div>


        <div className="user-box">
          <input  onChange={handleChange}
                  type="email"
                  text={signUpForm.email}
                  name="email"
                  value={signUpForm.email}
                  required="" />
          <label>Email</label>
        </div>

        <div className="user-box">
          <input onChange={handleChange}
                  type="text"
                  text={signUpForm.username}
                  name="username"
                  value={signUpForm.username}
                  required="" />
          <label>Username</label>
        </div>


        <div className="user-box">
          <input onChange={handleChange}
                  type="password"
                  text={signUpForm.password}
                  name="password"
                  value={signUpForm.password}
                  required="" />
          <label>Password</label>
        </div>


        <div className="user-box">
          <input onChange={handleChange}
                  type="password"
                  text={signUpForm.verify_password}
                  name="verify_password"
                  value={signUpForm.verify_password}
                  required="" />
          <label>Verify Password</label>
        </div>

        <a href="/">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <button onClick={signUp}>Submit</button>
        </a>
      </form>
      <p id="signup-link">Already have an account? <Link to='/'>Log in here.</Link></p>
    </div>
      </div>
    );
}

export default Signup;
