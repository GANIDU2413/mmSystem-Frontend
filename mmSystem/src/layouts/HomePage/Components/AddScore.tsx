import { useState } from 'react';

export const AddScore = () => {
 
   
    // new marks
    const [studentID, setStudentID] = useState('Category');
    const [courseID, setCourseID] = useState('');
    const [year,setYear] = useState('');
    const [assignmentType,setassignmentType] = useState('');
    const [assignmentScore,setassignmentScore] = useState('');
    const [level,setlevel] = useState('');
    const [semester, setSemester] = useState('');


    // Display
    const [displayWarning, setDisplayWaring] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    function studentIDField(value:string){

        setStudentID(value)
    }

    return(

        <div>
            
        </div>

    );


}