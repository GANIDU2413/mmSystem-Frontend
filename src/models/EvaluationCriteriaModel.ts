class EvaluationCriteriaModel {

    courseId: string;
    type : string;
    assignmentType : string;
    noOfConducted : string;
    noOfTaken : string;
    percentage : string;
    description : string;

    constructor(courseId: string, type:string,
        assignmentType:string,noOfConducted:string,
        noOfTaken:string,percentage:string,description:string){
            this.courseId = courseId;
            this.type = type;
            this.assignmentType = assignmentType;
            this.noOfConducted = noOfConducted;
            this.noOfTaken = noOfTaken;
            this.percentage = percentage;
            this.description = description;
        }


}

export default EvaluationCriteriaModel;