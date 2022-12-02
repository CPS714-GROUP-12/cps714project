import React, { useState, useEffect } from 'react'
//import { DataGrid } from '@mui/x-data-grid';
import { 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  collapseClasses ,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper
} from "@mui/material"
import axios from "axios"
import '../styles/App.css';

export default function LanguageHelpTab(props){
  const [data, setData] = useState([{}])
  const [value, setValue] = useState("")

  useEffect( () => {
    fetch("/chat", {
      'methods': "GET",
      headers : {
        'Content-Type':'application/json'
      }
  }).then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  const send_data =(event)=>{ 
    event.preventDefault()
    axios
      .post("/chat",       )
      .then(data => {
        setData(data.data)
        // console.log(data.data)
        // console.log(event.target.value)
      }).catch(error => console.log(error));
    return value
  }

  
  if (typeof data.languages === 'undefined')
    return (<p>Loading...</p>)
  else if (typeof data.english === 'undefined'){
    return (
      
      <div>
        <form action="#"  method="post">
        <FormControl sx={{ minWidth: 300}}>
          <InputLabel>Select A Language</InputLabel>
          <Select onChange={send_data}>
          { data.languages.map( (member) => (
              <MenuItem value={member}>{member}</MenuItem>
            ))
          }
          </Select>
        </FormControl>
        </form>        
      </div>
    )
  } else {
      let tableData = []
      for(let i=0; i<data.english.length; i++){
        tableData.push({
          english: data.english[i],
          translated: data.translated[i]
        })
      };
      console.log(tableData);
      return (
        <div>
          <form action="#"  method="post">
          <FormControl>
            <InputLabel>Select A Language</InputLabel>
            <Select onChange={send_data}>
            { data.languages.map( (member) => (
                <MenuItem value={member}>{member}</MenuItem>
              )
            )
            }
            </Select>
          </FormControl>
          </form>        
  
          <TableContainer component={Paper}>
            <TableHead>
              <TableCell>English</TableCell>
              <TableCell>Translated</TableCell>
            </TableHead>
            <TableBody>
              {
                tableData.map( (row) => (
                  <TableRow 
                  key={row.english}
                  sx={{'&:last-child td, &:last-child th': {border: 0}}}
                  >
                    <TableCell>{row.english}</TableCell>
                    <TableCell>{row.translated}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </TableContainer>
        </div>
      )
    }
 }
