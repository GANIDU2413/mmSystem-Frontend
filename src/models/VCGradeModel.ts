class VCGradeModel {

    studentId: string;
    courseId: string;
    semester: string;
    grade: string;

    constructor(studentId: string, courseId: string, semester:string, grade:string){

        this.studentId = studentId;
        this.courseId = courseId;
        this.semester = semester;
        this.grade = grade;
    }
}
export default VCGradeModel;