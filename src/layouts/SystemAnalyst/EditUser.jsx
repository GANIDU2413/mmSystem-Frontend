import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, Redirect, useParams } from 'react-router-dom';

export default function EditUser() {
  
  const [redirect, setRedirect] = useState(false);
    const {id}=useParams();
    const [user,setUser]=useState({
        fname:"",
        lname:"",
        username:"",
        email:"",
        password:""
    });

    const{fname,lname,username,email,password}=user;

    const onInputChange = (e)=>{
        setUser({...user,[e.target.name]:e.target.value});
    };

    useEffect(()=>{
        loadUser();

    },[]);

    const onSubmit=async (e)=>{
        e.preventDefault();
        await axios.put(`update by id API/${id}`,user);
        setRedirect(true);
    };

    if (redirect) {
        return <Redirect to="/viewalllec" />;
    }

    const loadUser = async ()=>{
        const result = await axios.get(`load academic person by id API`);
        setUser(result.data);
    };

  return (
    <div>EditUsers</div>
  )
}
