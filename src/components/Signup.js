import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

function Signup(props) {

    const [signUpForm, setSignUpForm] = useState({
      email: "",
      username: "",
      password: "",
      verify_password: "",
      first_name: "",
      last_name: ""
    })

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
        props.setToken(response.data.access_token)
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
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
        <h1>Signup</h1>
          <form className="Signup">
            <input onChange={handleChange}
                  type="email"
                  text={signUpForm.email}
                  name="email"
                  placeholder="Email"
                  value={signUpForm.email} />
            <input onChange={handleChange}
                  type="username"
                  text={signUpForm.username}
                  name="username"
                  placeholder="username"
                  value={signUpForm.username} />
            <input onChange={handleChange}
                  type="password"
                  text={signUpForm.password}
                  name="password"
                  placeholder="Password"
                  value={signUpForm.password} />
            <input onChange={handleChange}
                  type="verify_password"
                  text={signUpForm.verify_password}
                  name="verify_password"
                  placeholder="Verify Password"
                  value={signUpForm.verify_password} />
            <input onChange={handleChange}
                  type="first_name"
                  text={signUpForm.first_name}
                  name="first_name"
                  placeholder="First Name"
                  value={signUpForm.first_name} />
            <input onChange={handleChange}
                  type="last_name"
                  text={signUpForm.last_name}
                  name="last_name"
                  placeholder="last Name"
                  value={signUpForm.last_name} />


            <button onClick={signUp}>Submit</button>

        </form>
        <p>Already have an account? </p><Link to='/'>Log in here.</Link>
      </div>
    );
}

export default Signup;