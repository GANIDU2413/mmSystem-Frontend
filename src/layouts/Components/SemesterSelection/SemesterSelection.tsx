import React from 'react'

export default function SemesterSelection() {
  return (
    /*<div style={{marginTop:0,marginLeft:0,marginRight:0}}>
        <nav >
            <div classNameName="nav nav-tabs" id="semester-selection-tab" role="tablist" style={{backgroundColor:"rgba(0, 0, 0, 0.2)"}}>
                <button classNameName="nav-link active" id="nav-semester1-tab" data-bs-toggle="tab" data-bs-target="#nav-semester1" type="button" role="tab" aria-controls="nav-semester1" aria-selected="true">SEMESTER 1</button>
                <button classNameName="nav-link" id="nav-semester2-tab" data-bs-toggle="tab" data-bs-target="#nav-semester2" type="button" role="tab" aria-controls="nav-semester2" aria-selected="false">SEMESTER 2</button>
            </div>
        </nav>

      <div classNameName="tab-content" id="semester-selection-tabContent" >
        <div classNameName="tab-pane fade show active" id="nav-semseter1" role="tabpanel" aria-labelledby="nav-semester1-tab" >Semester 1 body</div>
        <div classNameName="tab-pane fade" id="nav-semester2" role="tabpanel" aria-labelledby="nav-semester2-tab" {...{tabindex:"0"}}>Semester 2 body</div>
      </div>
    </div>*/

    <div style={{marginTop:5,marginLeft:0,marginRight:0}}>
        <ul className="nav nav-pills mb-3" id="semesterSelectionTab" role="tablist">
            <li className="nav-item" role="presentation">
                <button className="nav-link active " id="semester1" data-bs-toggle="pill" data-bs-target="#sem1" type="button" role="tab" aria-controls="semester 1" aria-selected="true">SEMESTER I</button>
            </li>
            <li className="nav-item" role="presentation">
                <button className="nav-link " id="semester2" data-bs-toggle="pill" data-bs-target="#sem2" type="button" role="tab" aria-controls="semester 2" aria-selected="false">SEMESTER II</button>
            </li>
           
        </ul>
        <div className="tab-content" id="pills-tabContent">
            <div className="tab-pane fade show active" id="sem1" role="tabpanel" aria-labelledby="semester1" {...{tabindex:"0"}}>SEM 1</div>
            <div className="tab-pane fade" id="sem2" role="tabpanel" aria-labelledby="semester2" {...{tabindex:"0"}}>SEM 2</div>
        </div>
    </div>

    
  )
}
