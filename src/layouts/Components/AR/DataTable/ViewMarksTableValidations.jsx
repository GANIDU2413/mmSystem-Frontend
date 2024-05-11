import React from 'react'

export default function ViewMarksTableValidations() {
    const course_variables = useParams();   // get the course variables from the url

    const fetchData = async ()=>{
        const EStarStudents = await axios.get(`http://localhost:9090/api/AssistantRegistrar/getABDetailsByCourseId/${course_variables.course_id}`);    // get the students having AB for relevent exams


        if(EStarStudents.data.length>0){      // check whether there are students having AB scores
       
            setABStudentsAvailability(true);   // set the abStudentsAvailability state to true if there are students having AB scores
      
        }else{
            setABStudentsAvailability(false);       // set the abStudentsAvailability state to false if there are no students having AB scores
        }

    }




  return (
    <div>

    </div>
  )
}
