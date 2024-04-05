import axios from 'axios';
import React, { useState } from 'react'
import { Link,Redirect } from 'react-router-dom';

export default function AddLecturers() {
  const [redirect, setRedirect] = useState(false);
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
                        <label htmlFor='fName' className='form-label'>
                            First Name
                        </label>
                        <input 
                        type={"text"}
                        className='form-control'
                        placeholder='Enter your First Name'
                        name='fname' 
                        value={fname}
                        onChange={(e)=>onInputChange(e)}
                        />
                        
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='lName' className='form-label'>
                            Last Name
                        </label>
                        <input 
                        type={"text"}
                        className='form-control'
                        placeholder='Enter your Last Name'
                        name='lname' 
                        value={lname}
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
