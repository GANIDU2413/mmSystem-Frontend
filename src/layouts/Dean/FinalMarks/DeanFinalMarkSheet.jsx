import React, { useEffect, useState } from 'react'
import { NavebarDean } from '../NavebarDean'
import axios from 'axios';

export default function DeanFinalMarkSheet() {
    const [finalResults,setFinalResults] = useState([
        {
            student_id:"",
            courses:[
                {
                    course_id:"",
                    overall_score: "",
                    grade:""
                }
            ]
        }
    ]);

   // const[student,setStudent]=useState([]);
    

    let level=3
    let sem=1
    let department_id="ICT"
    let approved_level="HOD"  //AR

    const resultSheet = async () => {
        try {
            const result = await axios.get(`http://localhost:9090/api/studentMarks/GetMarksByDLS/${department_id}/${level}/${sem}/${approved_level}`);
            const data = result.data;

            // Process data to group courses by student_id


            // reduce: This method is used to transform the array of data into a new array where each student has an array of courses.
            // acc: The accumulator that collects the processed data.
            // curr: The current item being processed in the array.
            //existingStudent: Checks if the current student already exists in the accumulator.
            //If the student exists, it pushes the new course into the courses array of that student.
            //If the student does not exist, it creates a new student object and pushes it into the accumulator.

            const processedData = data.reduce((acc, curr) => {
                const existingStudent = acc.find(student => student.student_id === curr.student_id);
                if (existingStudent) {
                    existingStudent.courses.push({
                        course_id: curr.course_id,
                        overall_score: curr.overall_score,
                        grade: curr.grade,
                    });
                } else {
                    acc.push({
                        student_id: curr.student_id,
                        courses: [{
                            course_id: curr.course_id,
                            overall_score: curr.overall_score,
                            grade: curr.grade,
                        }]
                    });
                }
                return acc;
            }, []);

            setFinalResults(processedData);
            console.log(processedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    useEffect(()=>{
        resultSheet();
    }, [])



    
  return (
    <>
        <div>
            {/* <NavebarDean></NavebarDean> */}
        </div>
    </>
  )
}
