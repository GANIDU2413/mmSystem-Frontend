import React from 'react'
import { NavebarAR } from '../../Components/AR/NavBarAR/NavebarAR';
import BackButton from '../../Components/AR/BackButton/BackButton';
import { useHistory } from 'react-router-dom';
import './certifyMarksPage.css';

export default function CertifyMarksPage(props) {
    const department_id = props.department_id;
    const history = useHistory();
  return (
    <div>
        <NavebarAR />
        <div style={{width:"98%",marginLeft:"auto",marginRight:"auto",marginTop:"85px",alignContent:'center'}}>

            
            <table className="table table-striped">

              <thead>
                <tr>
                  <th colSpan={100} style={{textAlign:"center",backgroundColor:'#ebe8e8',textAlignLast:"center"}}>
                    Certify Student Marks <br/>
                  </th>
                </tr>         
              </thead>

              {/* <tbody style={{marginTop:"30px"}}>
                <tr className="clickable-row" key={"Level 1 Semester 1"} onClick={()=>
                      {
                        history.push(`/viewEStarUpdate/updateEStar/${department_id}`)
                      
                      }}>
                    <td>Level 1 Semester 1</td>
                    
                </tr>
              </tbody> */}
              
            </table>
            <div className="container">
                <div className="row">
                    <div className="col-sm">

                        

                        <div className="d-grid gap-3" style={{marginTop:"50px",marginRight:"30px"}}>
                            <label className="semesterLabel" >Semester 1</label>
                            <a className="btn btn-primary" type="button" href='arFinalMarkSheet/1/1'>Level 1</a>
                            <button className="btn btn-primary" type="button">Level 2</button>
                            <button className="btn btn-primary" type="button">Level 3</button>
                            <button className="btn btn-primary" type="button">Level 4</button>
                        </div>
                    </div>

                    <div className="col-sm">
                        <div className="d-grid gap-3" style={{marginTop:"50px",marginLeft:"30px"}}>
                            <label className="semesterLabel">Semester 2</label>
                            <button className="btn btn-primary" type="button">Level 1</button>
                            <button className="btn btn-primary" type="button">Level 2</button>
                            <button className="btn btn-primary" type="button">Level 3</button>
                            <button className="btn btn-primary" type="button">Level 4</button>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
  )
}
