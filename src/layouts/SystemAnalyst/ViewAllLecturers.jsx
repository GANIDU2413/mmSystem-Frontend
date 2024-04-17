import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';


export default function ViewAllLecturers() {

  const [users,setUser]=useState([]);

    const {id} =useParams();

    useEffect(()=> {
        loadUsers();  
    },[]);

    const loadUsers=async()=>{
        const result = await axios.get("http://localhost:9090/api/lecreg/get/alllecturersdetails");
        setUser(result.data);
        console.log(result.data);
    };

    const deleteUser= async (id)=>{
      await axios.delete(`delete api/${id}`);
      loadUsers();
    };
  return (
    <div className='container ' style={{marginTop:"70px"}}>
        <div className='py-4'>
          <table className="table border shadow">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">User ID</th>
                <th scope="col">Full Name</th>
                <th scope="col">Name with Initials</th>
                <th scope="col">User Name</th>
                <th scope="col">E-mail</th>
                <th scope="col">Password</th>
                <th scope="col">Reg-Year</th>
                <th scope="col">Role</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody >

              {
                  users.map((user,index)=>(
                      <tr>
                          <th scope="row" key={index}>{index+1}</th>
                          <td>{user.user_id}</td>
                          <td>{user.full_name}</td>
                          <td>{user.name_with_initials}</td>
                          <td>{user.user_name}</td>
                          <td>{user.email}</td>
                          <td>{user.password}</td>
                          <td>{user.registered_year}</td>
                          <td>{user.role}</td>
                          <td>
                              <Link className='btn btn-outline-primary mx-2 btn-sm' 
                                to={`/editlec/${user.id}`} >Edit</Link>
                              <button className='btn btn-danger mx-2 btn-sm'
                                onClick={()=>deleteUser(user.id)} >Delete</button>


                          </td>
                      </tr>
                  ))
              }
              
            </tbody>
          </table>
        </div>
    </div>
  )
}

