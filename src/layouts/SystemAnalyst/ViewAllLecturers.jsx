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
        const result = await axios.get("get all data from here");
        setUser(result.data);
    };

    const deleteUser= async (id)=>{
      await axios.delete(`delete api/${id}`);
      loadUsers();
    };
  return (
    <div className='container'>
        <div className='py-4'>
          <table className="table border shadow">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">User Name</th>
                <th scope="col">E-mail</th>
                <th scope="col">Reg-Year</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>

              {
                  users.map((user,index)=>(
                      <tr>
                          <th scope="row" key={index}>{index+1}</th>
                          <td>{user.fname}</td>
                          <td>{user.lname}</td>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td>{user.registered_year}</td>
                          <td>
                              <Link className='btn btn-outline-primary mx-2 btn-sm' 
                                to={`/edituser/${user.id}`} >Edit</Link>
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

