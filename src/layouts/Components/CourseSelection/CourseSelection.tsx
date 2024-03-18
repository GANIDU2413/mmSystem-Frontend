import React from 'react'

export default function CourseSelection(props :any) {
    var level=props.level;
    var semester=props.semester;
  return (
    <div>
        <table className="table">
            <thead>
                <tr>
                <th scope="col"></th>
                <th scope="col">Course Code</th>
                <th scope="col">Course Name</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">1</th>
                <td>ICT1123</td>
                <td>Introduction to Computer Science</td>
                
                </tr>
            </tbody>
            </table>
            {<br/>}{<br/>}{<br/>}{<br/>}
                Level {level}{<br/>}
                Semester {semester}
            

    </div>
  )
}
