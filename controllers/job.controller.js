import JobModel from "../model/job.model.js";
import fs from 'fs';
import applicantModel from "../model/applicant.model.js";
import { handleLoginModel, handleSingUpModel } from "../model/recruiter.model.js";
export const handleLogin = (req, res) => {
  const status = handleLoginModel(req.body);
  console.log(req.body);
  if(status){
    req.session.userEmail = req.body.email;
    res.redirect("/recruitment");
  } 
  else {
    res.render("layout", { success: false,errorMessage: true});
  }
};
  export const handleSignUp = (req, res) => {
    handleSingUpModel(req.body);
    res.render("layout",{success : true,errorMessage: false});
};
export const JobDetail = (req, res) => {
  const jobId = req.params.id;
  const job = JobModel.getById(jobId);
  const applicantsForJob = applicantModel.getByJobId(jobId);
  const numberOfApplicants = applicantsForJob.length;

  if (!job) {
      res.status(404).render('404');
  } else {
      // Set a cookie with the number of applicants
      res.cookie("numberOfApplicants", numberOfApplicants);
      res.render("MoreDetail", { job });
  }
};



export const fileHandle = (req, res) => {
  const { name, bio, email, contact } = req.body;
  const resumeFile = req.file;

  if (resumeFile) {
    const resumePath = `uploads/${resumeFile.originalname}`;
    fs.renameSync(resumeFile.path, resumePath);
    res.cookie("applicantInfo", JSON.stringify({ name, bio, email, contact, resumePath }));
    res.redirect("/jobs");
  } else {
    res.status(400).send('No resume file uploaded');
  }
};

export const postUpdateProduct=(req,res)=>{
    JobModel.update(req.body);
    var jobs = JobModel.getAll();
    
    const jobId = req.params.id;
    const job = JobModel.getById(jobId);
    const applicantsForJob = applicantModel.getByJobId(jobId);
    const numberOfApplicants = applicantsForJob.length;
    res.render('MoreDetail',{jobs,numberOfApplicants});
}
export const renderPage = (req,res)=>{
    res.render("layout",{success: false,errorMessage:false, content:"jobs"});
}
export const jobPage = (req,res)=>{
    var jobs = JobModel.getAll();
    res.render("jobs",{ jobs });
}
export const recruitmentPage = (req,res)=>{
    const jobs = JobModel.getAll();
    if(req.session.userEmail){
      res.render("recruitment",{jobs});
    }
    else {
       req.session.errorMessage = "You must be logged in to access this page.";
      res.redirect("/");
    }
  };    
export const formAcceptance = (req,res)=>{
    res.render("formSubmission");
}
