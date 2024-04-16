import axios from 'axios';
import React, { useState } from 'react'
import { Link,Redirect } from 'react-router-dom';

export default function AddLecturers() {
    const [redirect, setRedirect] = useState(false);
    const [user,setUser]=useState({
    user_id:"",
    full_name:"",
    name_with_initials:"",
    username:"",
    email:"",
    password:""
    });

const{user_id,full_name,name_with_initials,username,email,password}=user;

const fullNameConvertToInitial=(fullname)=>{
    if(!fullname) return '';
    const getfullname = fullname.split(' ');
    const namewithinitials = getfullname.map(n => n[0].toUpperCase()).join('. ');
    return namewithinitials;
}

const onInputChange = (e)=>{
    setUser({...user,[e.target.name]:e.target.value});
};

const onSubmit=async (e)=>{
    e.preventDefault();
    await axios.post("for add a lecturer API",user);
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
                        onChange={(e)=>{
                            onInputChange(e);
                            name_with_initials = fullNameConvertToInitial(e);
                        }}                        
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
                        name='username' 
                        value={username}
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

                    <button type='submit' className='btn btn-outline-primary'>Submit</button>
                    <Link className='btn btn-outline-danger mx-2' to="/viewalllec">Cancel</Link>
                </form>
            </div>
        </div>
    </div>
  )
}
