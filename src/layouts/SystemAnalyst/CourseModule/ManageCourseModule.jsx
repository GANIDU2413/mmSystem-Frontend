import React from 'react';

export default function ManageCourseModule() {
 return (
    <div className='container' style={{marginTop:"70px"}}>
        <div className="row g-3 my-1">
            <div className="col-md">
                <div className="form-floating">
                <input type="text" className="form-control" id="floatingInputGrid" placeholder="Enter course id" />
                <label htmlFor="floatingInputGrid">Course id</label>
                </div>
            </div><div className="col-md">
                <div className="form-floating">
                <input type="text" className="form-control" id="floatingInputGrid" placeholder="Enter course name" />
                <label htmlFor="floatingInputGrid">Course Name</label>
                </div>
            </div>
            
        </div>
        <div className="row g-3 my-1">
            <div className="col-md">
                <div className="form-floating">
                <input type="text" className="form-control" id="floatingInputGrid" placeholder="Enter course Credit" />
                <label htmlFor="floatingInputGrid">Course Credit</label>
                </div>
            </div>
            <div className="col-md">
                <div className="form-floating">
                <select className="form-select" id="floatingSelectGrid">
                    <option selected>Selecet Department</option>
                    <option value="1">ICT</option>
                    <option value="2">ET</option>
                    <option value="3">BST</option>
                    <option value="4">Multi_Disciplinary</option>
                </select>
                <label htmlFor="floatingSelectGrid">Department</label>
                </div>
            </div>
            <div className="col-md">
                <div className="form-floating">
                <input type="text" className="form-control" id="floatingInputGrid" placeholder="Enter course hours" />
                <label htmlFor="floatingInputGrid">Hours</label>
                </div>
            </div>
            
        </div>
        <div className="row g-3 my-1">
            <div className="col-md">
                <div className="form-floating">
                <input type="email" className="form-control" id="floatingInputGrid" placeholder="Enter Level" />
                <label htmlFor="floatingInputGrid">Level</label>
                </div>
            </div>
            <div className="col-md">
                <div className="form-floating">
                <input type="email" className="form-control" id="floatingInputGrid" placeholder="Semester" />
                <label htmlFor="floatingInputGrid">Semester</label>
                </div>
            </div>
            
        </div>
    </div>
 );
}

