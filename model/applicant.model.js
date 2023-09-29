let nextApplicantId = 1;
const applicants = [];

export default class applicantModel {
    constructor(name, email, contact, resumePath) {
        this.id = nextApplicantId++;
        this.name = name;
        this.email = email;
        this.contact = contact;
        this.resumePath = resumePath;
    }

    static add(appObj) {
        let newApplicant = new applicantModel(
            appObj.name,
            appObj.email,
            appObj.contact,
            appObj.resumePath
        );
        applicants.push(newApplicant);
        
    }

    static getAll() {
        return applicants;
    }
    static getByJobId(jobId) {
        return applicants.filter(applicant => applicant.jobId === jobId);
    }
}
