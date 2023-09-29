import JobModel from "../model/job.model.js";
import applicantModel from "../model/applicant.model.js";

export const editResponse=(req,res)=>{
    const jobId = req.params.id;
    const job = JobModel.getById(jobId);
    if(!job){
        res.status(404).render('404');
    }
        else {
            // Retrieve updated job details from the form
            const updatedTitle = req.body.title;
            const updatedDescription = req.body.description;
            const updatedImageUrl = req.body.imageUrl;
            const updatedTime = req.body.time;
            const updatedPlace = req.body.place;
            const updatedRole = req.body.role;
    
            // Update the job object
            job.title = updatedTitle;
            job.description = updatedDescription;
            job.imageUrl = updatedImageUrl;
            job.time = updatedTime;
            job.place = updatedPlace;
            job.role = updatedRole;
    
            // Redirect to the recruitment page or any other appropriate page
            res.redirect('/recruitment');
        }
    }
export const addJob = (req,res)=>{
    JobModel.add(req.body);
    console.log(req.body);
    res.redirect("/jobs");
}
export const appHandler = (req, res) => {
    const applicantInfoCookie = req.cookies.applicantInfo;
  
    if (applicantInfoCookie) {
      const applicantInfo = JSON.parse(applicantInfoCookie);
      const { name, bio, email, contact, resumePath } = applicantInfo;
      console.log(name, bio, email, contact, resumePath);
      if (!applicants) {
        var applicants = applicantModel.getAll();
      }

      const existingApplicant = applicants.find(app => app.email === email);

      if (!existingApplicant) {
         applicantModel.add(applicantInfo);
      }

      applicants = applicantModel.getAll();

      res.render('applicants', { applicants });
    } else {
      res.status(404).send('Applicant info not found');
    }
};



