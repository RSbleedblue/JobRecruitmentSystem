
export default class JobModel {
    constructor(id,title,description,imageUrl,time,place,role){
        this.id = id;
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.time = time;
        this.place = place;
        this.role = role;
    }
    static getAll(){
        return jobs;
    }
    static add(jobsObj){
        let newJob = new JobModel(
            jobs.length+1,
            jobsObj.title,
            jobsObj.description,
            jobsObj.imageUrl,
            jobsObj.time,
            jobsObj.place,
            jobsObj.role,
        );
        jobs.push(newJob);
    }
    static getById(id){
        return jobs.find((j)=>j.id == id);
    }
    static update(jobObj){
        const job = jobs.find(
            (j) => j.id == jobObj.id
        );
        jobs[job] = jobObj;
    }
}

var jobs = [ new JobModel(
    1,
    'Angular',
    'Working JS MODEL',
    'https://miro.medium.com/v2/resize:fit:1358/0*wuNf24urnMp7ypDp.png',
    '9:00Am to 6:00PM',
    'Delhi,Gurgaon,Noida',
    'Senior Analyst'
),
new JobModel(
    2,
    'React',
    'Can you Work on React',
    'https://repository-images.githubusercontent.com/37153337/9d0a6780-394a-11eb-9fd1-6296a684b124',
    '12:00PM to 6:00PM',
    'USA, NYC',
    'Developer'
)
];