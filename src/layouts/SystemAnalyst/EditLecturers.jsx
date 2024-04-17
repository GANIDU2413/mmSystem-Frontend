import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, Redirect, useParams } from 'react-router-dom';

export default function EditLecturers() {

    const [redirect, setRedirect] = useState(false);
    const {aid}=useParams();
    const [user,setUser]=useState({
        id:"",
        user_id:"",
        full_name:"",
        name_with_initials:"",
        user_name:"",
        email:"",
        password:"",
        registered_year:"",
        role:""
    });

    const{id,user_id,full_name,name_with_initials,user_name,email,password,registered_year,role}=user;


    const onInputChange = (e)=>{
        setUser({...user,[e.target.name]:e.target.value});
    };

    useEffect(()=>{
        loadUser();

    },[]);

    const onSubmit=async (e)=>{
        e.preventDefault();
        await axios.put(`http://localhost:9090/api/lecreg/edit/alecdetails/${aid}`,user);
        setRedirect(true);
    };

    if (redirect) {
        return <Redirect to="/viewalllec" />;
    }

    const loadUser = async ()=>{
        const result = await axios.get(`http://localhost:9090/api/lecreg/get/alllecturersdetails`);
        setUser(result.data);
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Edit Academics</h2>
                    <form onSubmit={(e)=>onSubmit(e)}>
                        <div className='mb-3'>
                            <label htmlFor='full_Name' className='form-label'>
                                Lecturer ID
                            </label>
                            <input 
                            type={"text"}
                            className='form-control'
                            placeholder='Enter your Lecturer ID'
                            name='user_id' 
                            value={user_id}
                            onChange={(e)=> onInputChange(e)}                        
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='fName' className='form-label'>
                                Full Name
                            </label>
                            <input 
                            type={"text"}
                            className='form-control'
                            placeholder='Enter your First Name'
                            name='full_name' 
                            value={full_name}
                            onChange={(e)=>onInputChange(e)}
                            />
                            
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='Username' className='form-label'>
                                Name with Initials
                            </label>
                            <input 
                            type={"text"}
                            className='form-control'
                            placeholder='Enter your Name with Initials'
                            name='name_with_initials' 
                            value={name_with_initials}
                            onChange={(e)=>onInputChange(e)}
                            />
                            
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='lName' className='form-label'>
                                Username
                            </label>
                            <input 
                            type={"text"}
                            className='form-control'
                            placeholder='Enter your Last Name'
                            name='user_name' 
                            value={user_name}
                            onChange={(e)=>onInputChange(e)}
                            />
                            
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='Email' className='form-label'>
                                E-mail
                            </label>
                            <input 
                            type={"text"}
                            className='form-control'
                            placeholder='Enter your E-mail Address'
                            name='email' 
                            value={email}
                            onChange={(e)=>onInputChange(e)}
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='Email' className='form-label'>
                                password
                            </label>
                            <input 
                            type={"password"}
                            className='form-control'
                            name='password' 
                            value={password}
                            onChange={(e)=>onInputChange(e)}
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='Email' className='form-label'>
                                Registered Year
                            </label>
                            <input 
                            type={"text"}
                            className='form-control'
                            name='registered_year' 
                            value={registered_year}
                            onChange={(e)=>onInputChange(e)}
                            />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='Email' className='form-label'>
                                User Role
                            </label>
                            <input 
                            type={"text"}
                            className='form-control'
                            name='role' 
                            value={role}
                            onChange={(e)=>onInputChange(e)}
                            />
                        </div>


                        <button type='submit' className='btn btn-outline-primary'>Submit</button>
                        <Link className='btn btn-outline-danger mx-2' to="/viewalllec">Cancel</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
