class AddScoreRequest {

    studentID: string;
    courseID: string;
    year: string;
    assignmentType: string;
    assignmentScore: string;
    level: string;
    semester: string;
    evaluationCriteriaId:string;

    constructor(studentID: string, courseID: string, year:string, assignmentType:string,
                assignmentScore: string, level: string, semester: string, evaluationCriteriaId:string){

                    this.studentID = studentID
                    this.courseID = courseID
                    this.year = year
                    this.assignmentType = assignmentType
                    this.assignmentScore = assignmentScore
                    this.level = level
                    this.semester = semester
                    this.evaluationCriteriaId = evaluationCriteriaId
                    
                }
}

export default AddScoreRequest;