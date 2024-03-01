class AddScoreRequest {

    studentID: string;
    courseID: string;
    year: string;
    assignmentType: string;
    assignmentScore: number;
    level: string;
    semester: string;

    constructor(studentID: string, courseID: string, year:string, assignmentType:string,
                assignmentScore: number, level: string, semester: string){

                    this.studentID = studentID
                    this.courseID = courseID
                    this.year = year
                    this.assignmentType = assignmentType
                    this.assignmentScore = assignmentScore
                    this.level = level
                    this.semester = semester
                    
                }
}

export default AddScoreRequest;