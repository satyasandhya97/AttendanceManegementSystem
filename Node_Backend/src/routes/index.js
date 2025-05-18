const {Router} = require('express');

const {signUp} = require('../controllers/signup_controllers');
const {signIn} = require('../controllers/signin_controllers');
const {staffSignIn,getStaffById, createStaff, updateStaff, deleteStaff, getAllStaff } = require('../controllers/staff_controllers');
const {getAllAttandance, AddAttandance,createRoster,updateRoster,deleteRoster,getAllRostersByStaff } = require('../controllers/roster_controllers');

const router = Router();

router.post("/signup",signUp)
router.post("/signIn",signIn)

router.post("/staffSignIn", staffSignIn);
router.get("/getStaffById/:id", getStaffById);

router.post("/addAttandance", AddAttandance);

router.get("/getAllAttandance", getAllAttandance);


router.post("/staff", createStaff); 
router.post("/updateStaff/:id", updateStaff);
router.delete("/deleteStaff/:id", deleteStaff);
router.get("/getstaff", getAllStaff); 

router.post("/createRoster", createRoster); 
router.post("/updateRoster/:id", updateRoster);
router.delete("/deleteRoster/:id", deleteRoster);
router.get("/getRoster/:staffId", getAllRostersByStaff); 

module.exports = router;
