import React from 'react'

export default function CourseSelection(props :any) {
    var level=props.level;
    var semester=props.semester;
  return (
    <div>
        <table className="table caption-top">
            <thead>
                <tr>
                <th scope="col"></th>
                <th scope="col">Course Code</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                </tr>
            </tbody>
            </table>
                Level {level}{<br/>}
                Semester {semester}
            

    </div>
  )
}
