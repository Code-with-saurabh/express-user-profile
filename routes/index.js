const express = require('express');
const router = express.Router();
 
const mongoForm = require('./form');

// router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
// });
 
/*here*/
router.get('/',(req,res)=>{
	res.render('form');
})
router.get('/read', async (req, res) => {
    try {
        let allUsers = await mongoForm.find();   
        if (Array.isArray(allUsers)) {
            res.render('read', { users: allUsers });   } else {
            res.status(500).send("The data returned is not an array.");
        }
    } catch (err) {
        res.status(500).send("Error fetching users: " + err);
    }
});
router.post('/createUser',async (req,res)=>{
	const {name,email,imgurl} = req.body;
	const userData = await mongoForm.create({
		name,
		email,
		imgurl
	});
	// const userData = await mongoForm.find OneAndDelete({email:'idkxyz@gmail.com'});
	// const userData = await mongoForm.find();
	// res.send(userData);
	res.redirect('/read');
	
});

router.get("/deleteUser/:id",async (req,res)=>{
		
		const DataDelete = await mongoForm.findOneAndDelete({
			_id:req.params.id
		}) 
		
		console.log("Usre Deleted : "+DataDelete);
		res.redirect('/read');
});

router.get("/edit/:userid", async (req, res) => {
    try {
        let user = await mongoForm.findOne({ _id: req.params.userid });
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.render("editUser", { user });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});
router.post("/updateUser/:userid", async (req, res) => {
    const { name, email, imgurl } = req.body;
    const updatedData = await mongoForm.findOneAndUpdate(
        { _id: req.params.userid },
        { name, email, imgurl }
    );
    // res.send(updatedData);
	res.redirect("/read");
});

module.exports = router;

