import axios from 'axios';
import React, { useState } from 'react'
import { Link,Redirect } from 'react-router-dom';

export default function AddLecturers() {
    const [redirect, setRedirect] = useState(false);
    const [user,setUser]=useState({
    user_id:"",
    full_name:"",
    name_with_initials:"",
    user_name:"",
    email:"",
    password:"",
    registered_year:"",
    role:"",
    });

const{user_id,full_name,name_with_initials,user_name,email,password,registered_year,role}=user;

const fullNameConvertToInitial=(fullname)=>{
    if(typeof fullname !== 'string' || fullname.trim() === '') return '';
    const getfullname = fullname.split(' ');
    if(getfullname.length === 0) return '';
    const namewithinitials = getfullname.slice(0, -1).map(n => n[0].toUpperCase()).join('. ')+' '+getfullname[getfullname.length -1];
    return namewithinitials;
}

const onInputChange = (e)=>{
    setUser({...user,[e.target.name]:e.target.value});
};

const onSubmit=async (e)=>{
    e.preventDefault();
    const updatedUSer = {...user,name_with_initials: fullNameConvertToInitial(full_name)}
    await axios.post("http://localhost:9090/api/lecreg/savelecdetails",updatedUSer);
    setRedirect(true);
}

if (redirect) {
  return <Redirect to="/viewalllec" />;
}

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Register Academics</h2>
                <form onSubmit={(e)=>onSubmit(e)}>

                    <div className='mb-3'>
                        <label htmlFor='full_Name' className='form-label'>
                            Lecturer ID
                        </label>
                        <input 
                        type={"text"}
                        className='form-control'
                        placeholder='Enter your First Name'
                        name='user_id' 
                        value={user_id}
                        onChange={(e)=> onInputChange(e)}                        
                        />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='full_Name' className='form-label'>
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
                            Username
                        </label>
                        <input 
                        type={"text"}
                        className='form-control'
                        placeholder='Enter your Username'
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
                    {/* add button */}
                    


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
