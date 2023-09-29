export const auth = (req, res, next) => {
    if (req.session.userEmail) {
        next();
    } else {
        req.session.errorMessage = "You must be logged in to access this page.";
       const errorMessage = req.session.errorMessage;
        console.log(req.session);
        res.render("layout",{ success: false, errorMessage }); 
    }
};
