import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditStudentModal({ row, onSubmit, onClose }) {
    const [userDetails, setUserDetails] = React.useState(row);

    const handleInputChange = (e) => {
        setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        try{
            e.preventDefault();
            onSubmit(userDetails);
            toast.success('User updated successfully');
            onClose();
        }
        catch(e){
            toast.error('Error updating user');
        }
        
    };

    return (
        <div className="modal" style={{ display: 'block', position: 'fixed', zIndex: 1, left: 0, top: 0, width: '100%', height: '100%', overflow: 'auto', backgroundColor: 'rgba(0,0,0,0.4)' }}>
            <div className="modal-content" style={{ backgroundColor: '#fefefe',  padding: '20px', border: '1px solid #888', width: '700px', maxWidth: '100%', transform: 'translate(-50%, -50%)', top: '50%', left: '50%', position: 'absolute' }}>
                <span className="close mx-3" onClick={onClose} style={{ fontSize: '2rem', cursor: 'pointer', position: 'absolute', top: '10px', right: '10px' }}>&times;</span>
                <form onSubmit={handleSubmit}>
                    <div>
                        <h2 className=' px-3'>Edit Student</h2>
                    </div>
                    <div className=' mt-3 px-5' style={{ margin: '0 auto',width:"600px" }}> 
                        <div className=' row g-1'>
                            <div> 
                                <label className='form-label' htmlFor="user_id">Student ID</label>
                                <input className='form-control' type="text" name="user_id" value={userDetails.student_id} onChange={handleInputChange} size="30" />
                            </div> 
                            <div>
                                <label className='form-label' htmlFor="user_id">Full name</label>
                                <input className='form-control' type="text" name="full_name" value={userDetails.full_name} onChange={handleInputChange} size="30" />
                            </div>
                            <div>
                                <label className='form-label' htmlFor="name_with_initials">Name with initials</label>
                                <input className='form-control' type="text" name="name_with_initials" value={userDetails.name_with_initials} onChange={handleInputChange} size="30" />
                            </div>
                        </div>
                        <div className=' row g-1'>
                            <div>
                                <label className='form-label' htmlFor="user_name">Username</label>
                                <input className='form-control' type="text" name="user_name" value={userDetails.user_name} onChange={handleInputChange} size="30" />
                            </div>
                            <div>
                                <label className='form-label' htmlFor="email">Email</label>
                                <input className='form-control' type="text" name="email" value={userDetails.email} onChange={handleInputChange} size="30" />
                            </div>
                            <div>
                                <label className='form-label' htmlFor="password">Password</label>
                                <input className='form-control' type="text" name="password" value={userDetails.password} onChange={handleInputChange} size="30" />
                            </div> 
                        </div>
                        <div className=' row g-1'>
                            <div>
                                <label className='form-label' htmlFor="registered_year">Registered year</label>
                                <input className='form-control' type="text" name="registered_year" value={userDetails.registered_year} onChange={handleInputChange} size="30" />
                            </div>
                            <div>
                                <label className='form-label' htmlFor="department_id">Department</label>
                                <input className='form-control' type="text" name="department_id" value={userDetails.department_id} onChange={handleInputChange} size="30" />
                            </div>
                        </div>
                        
                        
                    </div>
                    <button className='btn btn-outline-success btn-sm mt-3 mx-3' type="submit">Save</button>
                    <button className='btn btn-outline-danger btn-sm mt-3' type="button" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
}

export default EditStudentModal;

