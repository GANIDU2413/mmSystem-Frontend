import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { NavebarHOD } from './NavebarHOD';

export default function HODMarksReturnSheet(props) {
    const [marks, setMarks] = useState([]);
    const [evaluationCriteria, setEvaluationCriteria] = useState([]);
    const [calculations, setCalculations] = useState([]);
    const [studentList, setStudentList] = useState([]);
    const [noData, setNoData] = useState(false); // State to indicate if there is no data to display
    const { course_id, course_name } = useParams();
    const [approval_level, setApprovalLevel] = useState('');
    const history = useHistory();
    const [isChecked, setIsChecked] = useState(false);

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

            const list3 = await axios.get(`http://localhost:9090/api/marksCalculations/getMarksCalculation/${course_id}`);
            setCalculations(list3.data);

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

    return (
        <>
            <NavebarHOD />
            <div className=' container' style={{marginTop:"70px"}}>
            
            <h2>{course_name} - {course_id}</h2>
            <table className="table shadow table-bordered" style={{ marginTop: "30px", width: '100%' }}>
                <thead>
                    <tr>
                        <th scope="col">Student_ID</th>
                        {
                            evaluationCriteria.map((evaluationCriteria, index) => {
                                let headers = [];
                                if (evaluationCriteria.type == "CA") {
                                    if (evaluationCriteria.no_of_conducted > 1) {
                                        marks.map((ele, index) => {
                                            if (ele.assignment_name == evaluationCriteria.assessment_type) {
                                                const existsInHeaders = headers.some(header => header.props.children == ele.assignment_type);

                                                // If the assignment_name does not exist in the headers array, push the new element
                                                if (!existsInHeaders) {
                                                    headers.push(<th key={`${index}`} scope="col">{ele.assignment_type}</th>);
                                                }
                                            }
                                        });
                                        calculations.map((ele, index) => {
                                            const existsInHeaders = headers.some(header => header.props.children == evaluationCriteria.description);

                                            // If the assignment_name does not exist in the headers array, push the new element
                                            if (!existsInHeaders) {
                                                if (ele.type == evaluationCriteria.assessment_type) {
                                                    headers.push(<th key={`${index}`} scope="col">{evaluationCriteria.description}</th>);
                                                }
                                            }
                                        });
                                    } else {
                                        marks.map((ele, index) => {
                                            if (ele.assignment_name == evaluationCriteria.assessment_type) {
                                                const existsInHeaders = headers.some(header => header.props.children == ele.assignment_type);

                                                // If the assignment_name does not exist in the headers array, push the new element
                                                if (!existsInHeaders) {
                                                    headers.push(<th key={`${index}`} scope="col">{ele.assignment_type}</th>);
                                                }
                                            }
                                        });
                                    }

                                    calculations.map((calculations, index2) => {
                                        if (evaluationCriteria.assessment_type == calculations.type) {
                                            const existsInHeaders = headers.some(header => header.props.children == calculations.description);
                                            if (!existsInHeaders) {
                                                headers.push(<th key={`${index2}`} scope="col">{calculations.description}</th>);
                                            }
                                        }
                                    });
                                }
                                return headers;
                            }).flat()
                        }
                        {
                            calculations.map((ele, index) => {
                                let headers = [];
                                if (ele.type == "Total CA Mark") {
                                    headers.push(<th key={`${index}`} scope="col">{ele.description}</th>);
                                }
                                return headers;
                            }).flat()
                        }
                        {
                            evaluationCriteria.map((evaluationCriteria, index) => {
                                let headers = [];
                                if (evaluationCriteria.type == "End") {
                                    marks.map((ele, index) => {
                                        if (ele.assignment_name == evaluationCriteria.assessment_type) {
                                            const existsInHeaders = headers.some(header => header.props.children == ele.assignment_type);

                                            // If the assignment_name does not exist in the headers array, push the new element
                                            if (!existsInHeaders) {
                                                headers.push(<th key={`${index}`} scope="col">{ele.assignment_type}</th>);
                                            }

                                            calculations.map((calculations, index2) => {
                                                if (evaluationCriteria.assessment_type == calculations.type && ele.assignment_type !== "1st Marking" && ele.assignment_type !== "2nd Marking") {
                                                    headers.push(<th key={`${index2}`} scope="col">{calculations.description}</th>);
                                                }
                                            });
                                        }
                                    }).flat();
                                }
                                return headers;
                            }).flat()
                        }
                        {
                            calculations.map((ele, index) => {
                                let headers = [];
                                if (ele.type == "Final Marks") {
                                    headers.push(<th key={`${index}`} scope="col">{ele.description}</th>);
                                }
                                return headers;
                            }).flat()
                        }
                        <th>View</th>
                    </tr>
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
                                                        if (evaluationCriteria.assessment_type == mark.assignment_name) {
                                                            headers.push(<td key={`${index}`} scope="col">{mark.assignment_score}</td>);
                                                        }
                                                    }
                                                });
                                                calculations.map((cal, index) => {
                                                    if (ele == cal.student_id) {
                                                        if (cal.type == evaluationCriteria.assessment_type) {
                                                            headers.push(<td key={`${index}`} scope="col">{cal.mark}</td>);
                                                        }
                                                    }
                                                });
                                            } else {
                                                marks.map((mark, index) => {
                                                    if (mark.student_id == ele) {
                                                        if (evaluationCriteria.assessment_type == mark.assignment_name) {
                                                            headers.push(<td key={`${index}`} scope="col">{mark.assignment_score}</td>);
                                                        }
                                                    }
                                                });
                                            }
                                            calculations.map((cal, index) => {
                                                if (ele == cal.student_id) {
                                                    if (cal.type == evaluationCriteria.assessment_type) {
                                                        headers.push(<td key={`${index}`} scope="col">{cal.percentage}</td>);
                                                    }
                                                }
                                            });
                                        }
                                        return headers;
                                    }).flat()
                                }
                                {
                                    calculations.map((cal, index) => {
                                        let headers = [];
                                        if (cal.student_id == ele) {
                                            if (cal.type == "Total CA Mark") {
                                                headers.push(<td key={`${index}`} scope="col">{cal.percentage}</td>);
                                            }
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
                                                    if (mark.assignment_name == evaluationCriteria.assessment_type) {
                                                        headers.push(<td key={`${index}`} scope="col">{mark.assignment_score}</td>);
                                                        calculations.map((calculations, index2) => {
                                                            if (calculations.student_id == ele) {
                                                                if (evaluationCriteria.assessment_type == calculations.type && mark.assignment_type !== "1st Marking" && mark.assignment_type !== "2nd Marking") {
                                                                    headers.push(<td key={`${index2}`} scope="col">{calculations.percentage}</td>);
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
                                    calculations.map((calc, index) => {
                                        if (calc.student_id == ele) {
                                            let headers = [];
                                            if (calc.type == "Final Marks") {
                                                headers.push(<td key={`${index}`} scope="col">{calc.mark}</td>);
                                            }
                                            return headers;
                                        }
                                    }).flat()
                                }
                                <td><Link className=' btn btn-primary mx-3 btn-sm' to={`/MarksCheckingForm/${ele}/${course_id}`}>View</Link> </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div >
                <form onSubmit={handleReturn}>
                <input
                    type='submit'
                    value="Return"
                    className="btn shadow btn-outline-success btn-sm w-25 float-end my-4"
                    id="submitbtn"
                    style={{ float: 'right', width: '10px'}}
                />

                </form>
            </div>
            
           

            <form onSubmit={handleSubmit}>
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="check"
                        checked={isChecked}
                        onChange={() => setIsChecked(!isChecked)}
                    />
                    <label className="form-check-label" htmlFor="check">
                        I affirm that I have checked the results and confirm the accuracy for approval.
                    </label>
                </div>
                <input to={``} type="submit" value="Request Certify" className="btn btn-outline-success btn-sm"  id="submitbtn" disabled={!isChecked} style={{ width: '150px'}}/> <br /><br />
            </form>
            </div>
        </>
    )
}
