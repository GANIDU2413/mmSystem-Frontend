class AddScoreRequest {

    studentID: string;
    courseID: string;
    year: string;
    assignmentType: string;
    assignmentScore: number;
    level: string;
    semester: string;
    assignmentName:string;

    constructor(studentID: string, courseID: string, year:string, assignmentType:string,
                assignmentScore: number, level: string, semester: string, assignmentName:string){

                    this.studentID = studentID
                    this.courseID = courseID
                    this.year = year
                    this.assignmentType = assignmentType
                    this.assignmentScore = assignmentScore
                    this.level = level
                    this.semester = semester
                    this.assignmentName = assignmentName
                    
                }
}

export default AddScoreRequest;