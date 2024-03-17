import React from 'react'
import SemesterSelection from '../SemesterSelection/SemesterSelection'

import "./levelSelection.css";

export default function LevelSelection() {
  return (
    <div className="shadow" style={{marginTop:65,marginLeft:20,marginRight:20,}}>
        <nav >
            <div className="nav nav-tabs" id="level-selection-tab" role="tablist" style={{backgroundColor:"rgba(0, 0, 0, 0.1)"}}>
                <button className="nav-link active" id="nav-level1-tab" data-bs-toggle="tab" data-bs-target="#nav-level1" type="button" role="tab" aria-controls="nav-level1" aria-selected="true">LEVEL 1</button>
                <button className="nav-link " id="nav-level2-tab" data-bs-toggle="tab" data-bs-target="#nav-level2" type="button" role="tab" aria-controls="nav-level2" aria-selected="false">LEVEL 2</button>
                <button className="nav-link " id="nav-level3-tab" data-bs-toggle="tab" data-bs-target="#nav-level3" type="button" role="tab" aria-controls="nav-level3" aria-selected="false">LEVEL 3</button>
                <button className="nav-link " id="nav-level4-tab" data-bs-toggle="tab" data-bs-target="#nav-level4" type="button" role="tab" aria-controls="nav-level3" aria-selected="false">LEVEL 4</button>

            </div>
        </nav>
      <div className="tab-content" id="level-selection-tabContent" >
        <div className="tab-pane fade show active" id="nav-level1" role="tabpanel" aria-labelledby="nav-level1-tab" >
          <SemesterSelection/>
        </div>
        <div className="tab-pane fade" id="nav-level2" role="tabpanel" aria-labelledby="nav-level2-tab" {...{tabindex:"0"}}>
          <SemesterSelection/>
        </div>
        <div className="tab-pane fade" id="nav-level3" role="tabpanel" aria-labelledby="nav-level3-tab" {...{tabindex:"0"}}>
          <SemesterSelection/>
        </div>
        <div className="tab-pane fade" id="nav-level4" role="tabpanel" aria-labelledby="nav-level4-tab" {...{tabindex:"0"}}>
          <SemesterSelection/>
        </div>
      </div>
    </div>
  )
}
