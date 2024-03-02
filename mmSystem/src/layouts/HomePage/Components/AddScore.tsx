import { useState } from 'react';

export const AddScore = () => {
 
   
    // new marks
    const [studentID, setStudentID] = useState('Category');
    const [courseID, setCourseID] = useState('');
    const [year,setYear] = useState('');
    const [assignmentType,setassignmentType] = useState('');
    const [assignmentScore,setassignmentScore] = useState(0);
    const [level,setlevel] = useState('');
    const [semester, setSemester] = useState('');


    // Display
    const [displayWarning, setDisplayWaring] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);
    
    function yearField(value: string) {
        setYear(value);
    }

    return(

        <div className='container mt-5 mb-5'>
            {displaySuccess && 
               <div className='alert alert-success' role='alert'>
                     Mark Add successfully
               </div>

            }
            {displayWarning && 
                <div className='alert alert-danger' role='alert'>
                   All fields must be filled out    
                </div>

            }
            <div className='card'>
                <div className='card-header'>
                    Add a new Score
                </div>
            <div className='card-body'>
            <form method='POST'>
                        <div className='row'>
                            <div className='col-md-6 mb-3'>
                                <label className='form-label'>Student ID</label>
                                <input type="text" className='form-control' name='title' required 
                                    onChange={e => setStudentID(e.target.value)} value={studentID} />
                            </div>
                            <div className='col-md-3 mb-3'>
                                <label className='form-label'> Author </label>
                                <input type="text" className='form-control' name='author' required 
                                    onChange={e => setCourseID(e.target.value)} value={courseID}/>
                            </div>
                            <div className='col-md-3 mb-3'>
                                <label className='form-label'>Acadamic Year</label>
                                <button className='form-control btn btn-secondary dropdown-toggle' type='button' 
                                    id='dropdownMenuButton1' data-bs-toggle='dropdown' aria-expanded='false'>
                                        {year}
                                </button>
                                <ul id='addNewBookId' className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                                    <li><a onClick={() => yearField('2020')} className='dropdown-item'>2020</a></li>
                                    <li><a onClick={() => yearField('2021')} className='dropdown-item'>2021</a></li>
                                    <li><a onClick={() => yearField('2022')} className='dropdown-item'>2022</a></li>
                                    <li><a onClick={() => yearField('2023')} className='dropdown-item'>2023</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className='col-md-12 mb-3'>
                            <label className='form-label'>Description</label>
                            <textarea className='form-control' id='exampleFormControlTextarea1' rows={3} 
                                onChange={e => setassignmentType(e.target.value)} value={assignmentType}></textarea>
                        </div>
                        <div className='col-md-3 mb-3'>
                            <label className='form-label'>Copies</label>
                            <input type='number' className='form-control' name='Copies' required 
                                onChange={e => setassignmentScore(Number(e.target.value))} value={assignmentScore}/>
                        </div>
                        <input type='file' />
                        <div>
                            <button type='button' className='btn btn-primary mt-3'>
                                Add Score
                            </button>
                        </div>
                    </form>
</div>
            </div>
        </div>

    );


}