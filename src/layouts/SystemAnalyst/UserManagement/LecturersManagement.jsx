import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './LecturersManagement.css';

export default function LecturersManagement() {
    const [users, setUser] = useState([]);
    const [user, setUserDetails] = useState({
        user_id: "",
        full_name: "",
        name_with_initials: "",
        user_name: "",
        email: "",
        password: "",
        registered_year: "",
        role: "",
    });

    const { id } = useParams();
    const [refreshKey, setRefreshKey] = useState(Date.now());

    useEffect(() => {
        loadUsers();
    }, [refreshKey]);

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:9090/api/lecreg/get/alllecturersdetails");
        setUser(result.data);
        console.log(result.data);
    };

    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:9090/api/lecreg/deletelecturer/${id}`);
        loadUsers();
    };

    const fullNameConvertToInitial = (fullname) => {
        if (typeof fullname !== 'string' || fullname.trim() === '') return '';
        const getfullname = fullname.split(' ');
        if (getfullname.length === 0) return '';
        const namewithinitials = getfullname.slice(0, -1).map(n => n[0].toUpperCase()).join('. ') + ' ' + getfullname[getfullname.length - 1];
        return namewithinitials;
    }

    const onInputChange = (e) => {
        setUserDetails({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const updatedUser = { ...user, name_with_initials: fullNameConvertToInitial(user.full_name) };
        await axios.post("http://localhost:9090/api/lecreg/savelecdetails", updatedUser);

        setUserDetails({
            user_id: "",
            full_name: "",
            name_with_initials: "",
            user_name: "",
            email: "",
            password: "",
            registered_year: "",
            role: "",
        });

        setRefreshKey(Date.now());
    };

    

    return (
        <div className='container' style={{marginTop:"70px"}}>
            
            <div className='row'>
                <div className='col-md-12 border p-4 mt-2 mb-3 shadow'>
                    <h2 className='text-center m-4'>Register Academics</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='mb-3 row'>
                            <div className='col-md-3'>
                                <label htmlFor='user_id' className='form-label'>Lecturer ID</label>
                                <input type={"text"} className='form-control' placeholder='Enter Lecturer ID' name='user_id' value={user.user_id} onChange={(e) => onInputChange(e)} />
                            </div>
                            <div className='col-md-3'>
                                <label htmlFor='full_name' className='form-label'>Full Name</label>
                                <input type={"text"} className='form-control' placeholder='Enter Full Name' name='full_name' value={user.full_name} onChange={(e) => onInputChange(e)} />
                            </div>
                            <div className='col-md-3'>
                                <label htmlFor='registered_year' className='form-label'>Registered Year</label>
                                <input type={"text"} className='form-control' placeholder='Enter Registered Year' name='registered_year' value={user.registered_year} onChange={(e) => onInputChange(e)} />
                            </div>
                            <div className='col-md-3'>
                                <label htmlFor='role' className='form-label'>User Role</label>
                                <input type={"text"} className='form-control' placeholder='Enter User Role' name='role' value={user.role} onChange={(e) => onInputChange(e)} />
                            </div>
                        </div>
                        <div className='mb-3 row'>
                            <div className='col-md-3'>
                                <label htmlFor='email' className='form-label'>E-mail</label>
                                <input type={"text"} className='form-control' placeholder='Enter E-mail Address' name='email' value={user.email} onChange={(e) => onInputChange(e)} />
                            </div>
                            <div className='col-md-3'>
                                <label htmlFor='user_name' className='form-label'>Username</label>
                                <input type={"text"} className='form-control' placeholder='Enter Username' name='user_name' value={user.user_name} onChange={(e) => onInputChange(e)} />
                            </div>
                            <div className='col-md-3'>
                                <label htmlFor='password' className='form-label'>Password</label>
                                <input type={"password"} className='form-control' placeholder='Enter Password' name='password' value={user.password} onChange={(e) => onInputChange(e)} />
                            </div>
                            <div className='col-md-3 d-flex align-items-end'>
                                <button type='submit' className='btn btn-outline-primary mx-2'>Submit</button>
                                {/* me cancel eka weda ne thama  */}
                                <Link className='btn btn-outline-danger mx-2' to="/lecmanage">Cancel</Link> 
                                
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className='row'>
                <div className='col-md-12'>
                    <div className='pb-5'>
                        <div id='table-wrapper'></div>
                            <div id='table-scroll' ></div>
                                <table className="table border shadow" >
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
                                        {users.map((user, index) => (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{user.user_id}</td>
                                                <td>{user.full_name}</td>
                                                <td>{user.name_with_initials}</td>
                                                <td>{user.user_name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.password}</td>
                                                <td>{user.registered_year}</td>
                                                <td>{user.role}</td>
                                                <td>
                                                    <Link className='btn btn-outline-primary mx-2 btn-sm' to={`/edituser/${user.id}`}>Edit</Link>
                                                    <button className='btn btn-danger mx-2 btn-sm' onClick={() => deleteUser(user.id)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                    </div>
                </div>
            </div>
            
        </div>
    );
}
