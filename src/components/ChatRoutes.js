import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import '../styles/signup.css'

function ChatDataRoute(props) {

const [chatData, setChatData] = useState({ 
    username: "",
    chat_value: "",
    category: "",
  })
  
    function getChatData() {
      axios({
        method: "GET",
        url:"/chat",
      //   data:{
      //     username: chatData.username,
      //     chat_value: chatData.password,
      //     category: chatData.category,
      //    }
      })
      .then((response) => {
        const res = response.data
        setChatData(({
          username: res.name,
          chat_value: res.chat_value,
          category: res.category
         }))
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
          }
    })}
  
    function addChatData(event) {
      axios({
        method: "POST",
        url:"/chat",
        data:{
          username: chatData.username,
          chat_value: chatData.password,
          category: chatData.category,
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
  
      setChatData(({
        username: "",
        chat_value: "",
        category: "",
      
      }))
  
      event.preventDefault()
    }
  
    function handleChange(event) {
      const {value, name} = event.target
      setChatData(prevNote => ({
          ...prevNote, [name]: value})
      )}

    //   return (
    //     <div>
    //     <div className="login-box">
    //     <h2>ChatData</h2>
    //     </div>
    //     </div>
    //   );
  }
  
  export default ChatDataRoute;
  