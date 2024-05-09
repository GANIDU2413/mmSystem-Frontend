import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { NavebarHOD } from './NavebarHOD';
import SignatureCanvas from 'react-signature-canvas';
import { useDropzone } from 'react-dropzone';

export default function HODMarksReturnSheet(props) {
    const [marks, setMarks] = useState([]);
    const [evaluationCriteria, setEvaluationCriteria] = useState([]);
    const [calculations, setCalculations] = useState([]);
    const [studentList, setStudentList] = useState([]);
    const[grade, setGrade] = useState([]);
    const [noData, setNoData] = useState(false); // State to indicate if there is no data to display
    const { course_id, course_name } = useParams();
    const [approval_level, setApprovalLevel] = useState('');
    const history = useHistory();
    const [sign,setSign] = useState()
    const [url,setUrl] = useState()
    const [radioSelection, setRadioSelection] = useState('digitalSignature');
    const [showSignatureSection, setShowSignatureSection] = useState(false);
    const [showUploadSection, setShowUploadSection] = useState(false);
    const [files, setFiles] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showSaveClearButtons, setShowSaveClearButtons] = useState(false);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
        setSelectedImage(acceptedFiles[0].preview);
        setShowSaveClearButtons(true);
        }
    });


    let CAAvailable = false;


    let headersData = [];
    let headerValue= [];


    useEffect(() => {
        result();
    }, [course_id]);

    const result = async () => {
        try {
            const list = await axios.get(`http://localhost:9090/api/evaluationCriteria/getCriteria/${course_id}`);
            if (list.data == null || list.data.length === 0) {
                setEvaluationCriteria([]);
                setNoData(true); // Set noData to true if there is no data
            } else {
                setEvaluationCriteria(list.data);
            }

            const list2 = await axios.get(`http://localhost:9090/api/StudentAssessment/get/scoreByCourseId/${course_id}`);
            setMarks(list2.data);
            console.log(marks)

            const list3 = await axios.get(`http://localhost:9090/api/marksCalculations/getMarksCalculation/${course_id}`);
            setCalculations(list3.data);
           console.log(calculations)


            //getting data from grade table
            const list4 = await axios.get(`http://localhost:9090/api/studentMarks/getStudentMarksbyCourse/${course_id}`);
            setGrade(list4.data.content);
            console.log(grade)

        } catch (error) {
            console.error(error);
            setNoData(true); // Set noData to true if there is an error
        }
    };

    useEffect(() => {
        const result1 = async () => {
            try {
                const list = await axios.get(`http://localhost:9090/api/studentRegCourses/getStudentsByCourse/${course_id}`);
                setStudentList(list.data);
            } catch (error) {
                console.error(error);
                setNoData(true); // Set noData to true if there is an error
            }
        };
        result1();
    }, [course_id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setApprovalLevel("HOD");
            const response = await axios.put(`http://localhost:9090/api/approvalLevel/updateApprovalLevel/${course_id}/${new Date().getFullYear()}/${approval_level}`);
            if (response.status === 200) {
                console.log("Approval level updated successfully");
            } else {
                console.error("Failed to update approval level");
            }
        } catch (error) {
            console.error("Error updating approval level: ", error);
        }
    };

    const handleReturn = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        history.goBack(); // Navigate back
    };

    const handleClear= () =>{
        sign.clear()
        setUrl('')
    }
    const handleGenerate= () =>{
        setUrl(sign.getTrimmedCanvas().toDataURL('image/png'))
    }
    console.log(url);
  

    const images = files.map(file => (
        <div key={file.name}>
            <img src={file.preview} alt={file.name} style={{ width: '100%', height: 'auto' }} />
        </div>
    ));

    const handleSave = () => {
        // Logic to save the image
        console.log("Save button clicked");
        // You can add your save logic here
      };
    
      const handlClear = () => {
        // Logic to clear the selected image
        setSelectedImage(null);
        setShowSaveClearButtons(false);
      };


    return (
        <>
            <NavebarHOD />
            <div className=' container' style={{marginTop:"70px"}}>
          
            <div>
                <div >
                    <form onSubmit={handleReturn}>
                    <input
                        type='submit'
                        value="Marks Return"
                        className="btn shadow btn-outline-success btn-sm float-end my-4"
                        id="submitbtn"
                        style={{ float: 'right', width: '130px'}}
                    />

                    </form>
                </div>
                <table>
                    <tr>
                        <td class="text-decoration-underline font-italic"><p>Mark Return Sheet:</p></td>
                    </tr>
                    <tr>
                        <td><p>Marks Obtained by the Candidate for:</p></td>
                    </tr>
                    <tr>
                        <td>Academic Year:</td>
                        <td></td>
                        <td>Degree:</td>
                        <td></td>
                        <td>2nd Semsester Examination: December 2023</td>
                    </tr>
                </table>
                <h4>Course code and Title : {course_name} - {course_id}</h4>
            </div>

            
            <table className="table shadow table-bordered" style={{ marginTop: "30px", width: '100%' }}>
                <thead>
                    <tr>
                        <th scope="col">Student_ID</th>
                        {
                            
                            evaluationCriteria.map((evaluationCriteria, index) => {
                                let headers = [];
                                
                                if (evaluationCriteria.type == "CA") {
                                    CAAvailable = true;
                                    if (evaluationCriteria.no_of_conducted > 1) {
                                        marks.map((ele, index) => {
                                            if (ele.evaluation_criteria_id == evaluationCriteria.evaluationcriteria_id) {
                                               
                                                    headers.push(<th key={`${index}`} scope="col">{ele.assignment_name}</th>);
                                                    headersData.push(ele.assignment_name)
                                                
                                            }
                                        });
                                        // calculations.map((ele, index) => {
                                           
                                            headers.push(<th key={`${index}`} scope="col">{evaluationCriteria.description}</th>);
                                            headersData.push(evaluationCriteria.description)
                                            headers.push(<th scope="col">{ evaluationCriteria.percentage}% from  {evaluationCriteria.description}</th>);
                                            headersData.push(`${evaluationCriteria.percentage}% from  ${evaluationCriteria.description}`)
                                            
                                        // });
                                    } else {
                                        marks?.map((ele, index) => {
                                            if (ele.evaluation_criteria_id == evaluationCriteria.evaluationcriteria_id) {
                                               
                                                    headers.push(<th key={`${index}`} scope="col">{ele.assignment_name}</th>);
                                                    headersData.push(ele.assignment_name)
                                                
                                            }
                                        });

                                        headers.push(<th scope="col">{ evaluationCriteria.percentage}% from  {evaluationCriteria.assessment_type}</th>);
                                        headersData.push(`${evaluationCriteria.percentage}% from  ${evaluationCriteria.assessment_type}`)

                                    }   
                                }
                                return headers;
                            }).flat()
                        }

                        
                        {CAAvailable ? <th scope="col">Total CA Marks</th> : null}
                        

                        {
                            evaluationCriteria.map((evaluationCriteria, index) => {
                                let headers = [];
                                if (evaluationCriteria.type == "End") {
                                    marks.map((ele, index) => {
                                        if (ele.evaluation_criteria_id == evaluationCriteria.evaluationcriteria_id) {
                                            
                                                headers.push(<th key={`${index}`} scope="col">{ele.assignment_name}</th>);
                                                headersData.push(ele.assignment_name)

                                           
                                                if ( ele.assignment_name !== "1st Marking" && ele.assignment_name !== "2nd Marking") {
                                                    headers.push(<th scope="col">{evaluationCriteria.percentage}% from {evaluationCriteria.assessment_type}</th>);
                                                    headersData.push(`${evaluationCriteria.percentage}% from ${evaluationCriteria.assessment_type}`)
                                                }
                                        
                                        }
                                    }).flat();
                                }
                               
                                return headers;
                            }).flat()
                        }
                       
                        <th scope="col">Total Final Marks</th>  
                        <th scope="col">Total Rounded Marks</th>
                        <th scope="col">Results/Grades</th>
                        <th scope="col">GPV</th>
                                    
                        <th>Remarks,Continuous Assessment Pass/Fail</th>
                        <th>View</th>
                    </tr>
                    {console.log(headersData)}
                </thead>
                <tbody>
                    {
                        studentList.map((ele, index) => (
                            <tr>
                                <td scope="col" key={index}>{ele}</td>
                                {
                                    evaluationCriteria.map((evaluationCriteria, index) => {
                                        let headers = [];
                                        if (evaluationCriteria.type == "CA") {
                                            if (evaluationCriteria.no_of_conducted > 1) {
                                                marks.map((mark, index) => {
                                                    if (mark.student_id == ele) {
                                                        if (evaluationCriteria.evaluationcriteria_id == mark.evaluation_criteria_id) {
                                                            headers.push(<td key={`${index}`} scope="col">{mark.assignment_score ? mark.assignment_score: "-"}</td>);
                                                            headerValue.push(mark.assignment_score ? mark.assignment_score: "-")
                                                        }
                                                    }
                                                });
                                                calculations.map((cal, index) => {
                                                    if (ele == cal.student_id) {
                                                        if (cal.evaluation_criteria_id == evaluationCriteria.evaluationcriteria_id) {
                                                            headers.push(<td key={`${index}`} scope="col">{cal.mark? cal.mark: "-"}</td>);
                                                            headerValue.push(cal.mark? cal.mark: "-")
                                                        }
                                                    }
                                                });
                                            } else {
                                                marks.map((marks, index) => {
                                                    if (ele == marks.student_id) {
                                                        if (marks.evaluation_criteria_id == evaluationCriteria.evaluationcriteria_id) {
                                                            headers.push(<td key={`${index}`} scope="col">{marks.assignment_score? marks.assignment_score: "-"}</td>);
                                                            headerValue.push(marks.assignment_score? marks.assignment_score: "-")
                                                        }
                                                    }
                                                });
                                            }
                                            calculations.map((cal, index) => {
                                                if (ele == cal.student_id) {
                                                    if (cal.evaluation_criteria_id == evaluationCriteria.evaluationcriteria_id) {
                                                        headers.push(<td key={`${index}`} scope="col">{cal.percentage? cal.percentage: "-"}</td>);
                                                        headerValue.push(cal.percentage? cal.percentage: "-")
                                                    }
                                                }
                                            });
                                        }
                                        return headers;
                                    }).flat()
                                }
                                {
                                    grade?.map((grade, index) => {
                                        let headers = [];
                                        if (grade.student_id == ele) {
                                           
                                                headers.push(<td key={`${index}`} scope="col">{grade.total_ca_mark? grade.total_ca_mark: "-"}</td>);
                                                headerValue.push(grade.total_ca_mark? grade.total_ca_mark: "-")
                                               
                                        }
                                        return headers;
                                    }).flat()
                                }
                               
                                {
                                    evaluationCriteria.map((evaluationCriteria, index) => {
                                        let headers = [];
                                        if (evaluationCriteria.type == "End") {
                                            marks.map((mark, index) => {
                                                if (mark.student_id == ele) {
                                                    if (mark.evaluation_criteria_id == evaluationCriteria.evaluationcriteria_id) {
                                                        headers.push(<td key={`${index}`} scope="col">{mark.assignment_score? mark.assignment_score: "-"}</td>);
                                                        headerValue.push(mark.assignment_score? mark.assignment_score: "-")
                                                        calculations.map((calculations, index2) => {
                                                            if (calculations.student_id == ele) {
                                                                if (evaluationCriteria.evaluationcriteria_id == calculations.evaluation_criteria_id && mark.assignment_name !== "1st Marking" && mark.assignment_name !== "2nd Marking") {
                                                                    headers.push(<td key={`${index2}`} scope="col">{calculations.percentage? calculations.percentage: "-"}</td>);
                                                                    headerValue.push(calculations.percentage? calculations.percentage: "-")
                                                                }
                                                            }
                                                        });
                                                    }
                                                }
                                            }).flat()
                                        }
                                        return headers;
                                    }).flat()
                                }
                                {
                                    grade?.map((grade, index) => {
                                        if (grade.student_id == ele) {
                                            let headers = [];
                                            headers.push(<td key={`${index}`} scope="col">{grade.total_final_mark? grade.total_final_mark: "-"}</td>);
                                            headerValue.push(grade.total_final_mark? grade.total_final_mark: "-")
                                            headers.push(<td key={`${index}`} scope="col">{grade.total_rounded_mark? grade.total_rounded_mark: "-"}</td>);
                                            headerValue.push(grade.total_rounded_mark? grade.total_rounded_mark: "-")
                                            headers.push(<td key={`${index}`} scope="col">{grade.grade? grade.grade: "-"}</td>);
                                            headerValue.push(grade.grade? grade.grade: "-")
                                            headers.push(<td key={`${index}`} scope="col">{grade.gpv? grade.gpv :  "-"}</td>);
                                            headerValue.push(grade.gpv? grade.gpv :  "-")
                                            headers.push(<td key={`${index}`} scope="col">{grade.ca_eligibility?  grade.ca_eligibility:"-"}</td>);
                                            headerValue.push(grade.ca_eligibility?  grade.ca_eligibility:"-" )
                                            return headers;
                                        }
                                    }).flat()
                                }
                                <td>
                                <Link className=" btn btn-primary mx-3 btn-sm" to={`/MarksCheckingForm/${ele}/${course_id}/${course_name}`}>View</Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            
            
                <div style={{float:"left"}}>
                    
                    <div>
                        <table>
                            <tr>
                                <td>Coordinator/ Examinar :</td>
                                <td></td>
                                <td>Sign:</td>
                                <td><button className='imgsUpload'></button></td>
                                <td>Date:</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Checked by :</td>
                                <td></td>
                                <td>Sign:</td>
                                <td></td>
                                <td>Date:</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Head of the Department : </td>
                                <td></td>
                                <td>Sign:</td>
                                <td></td>
                                <td>Date:</td>
                                <td></td>
                            </tr>
                        </table>
                    </div>


                    <form onSubmit={handleSubmit}>
                        <input to={``} type="submit" value="Send" className="btn btn-outline-success btn-sm"  id="submitbtn" style={{ width: '100px'}}/> <br /><br />
                    </form>
                </div>


                <div style={{ display: 'flex', marginLeft: "200px", float: "left" }}>
                    <div style={{ float: "right" }}>
                        {radioSelection === 'digitalSignature' && (
                        <div style={{ border: "2px solid black", width: 500, height: 200 }}>
                            <SignatureCanvas
                            canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
                            ref={data => setSign(data)}
                            />
                            <br />
                            <button className='btn btn-outline-success btn-sm' style={{ width: "100px" }} onClick={handleGenerate}>Save</button>
                            <button className='btn btn-danger btn-sm mx-3' style={{ width: "100px" }} onClick={handleClear}>Clear</button>
                            <br />
                            <img src={url} />
                        </div>
                        )}
                        {radioSelection === 'uploadSignature' && (
                        <div style={{ border: '2px solid black', width: '500px', height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <div {...getRootProps()} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <input {...getInputProps()} />
                            {isDragActive? <p>Drop the files here...</p> : <p>Drag 'n' drop some files here, or click to select files</p>}
                            </div>
                            {files.map(file => (
                            <div key={file.name}>
                                <img src={file.preview} alt={file.name} style={{ width: '100%', height: 'auto' }} />
                            </div>
                            ))}
                            {showSaveClearButtons && (
                            <div>
                                <button className='btn btn-outline-success btn-sm' onClick={handleSave} style={{ marginRight: '10px' }}>Save</button>
                                <button className='btn btn-danger btn-sm mx-3' onClick={handleClear}>Clear</button>
                            </div>
                            )}
                            {selectedImage && (
                            <div style={{ width: '200px', height: '100px', border: '1px solid black', overflow: 'hidden' }}>
                                <img src={selectedImage} alt="Selected" style={{ width: '100%', height: 'auto' }} />
                                
                            </div>
                            
                            )}
                        </div>
                        )}
                    </div>
                    <div>
                        <div className="btn-group-vertical" role="group" aria-label="Vertical radio toggle button group">
                        <input type="radio" className="btn-check" name="vbtn-radio" id="vbtn-radio1" autoComplete="off" checked={radioSelection === 'digitalSignature'} onChange={() => setRadioSelection('digitalSignature')} />
                        <label className="btn btn-outline-danger" htmlFor="vbtn-radio1">Digital Signature</label>
                        <input type="radio" className="btn-check" name="vbtn-radio" id="vbtn-radio2" autoComplete="off" checked={radioSelection === 'uploadSignature'} onChange={() => setRadioSelection('uploadSignature')} />
                        <label className="btn btn-outline-danger" htmlFor="vbtn-radio2">Upload a Signature</label>
                        </div>
                    </div>
                </div>



            </div>

        </>
    )
    
}
