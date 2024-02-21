import Express from "express"
import Userdb from "../model/userModel"
const router=Express.Router();

router.post("/register",async(req,res)=>{
    try{
        const userExists=await Userdb.findOne({email:req.body.email});
        if(userExists)
        {
            return res.status(200).send({message:"User already Exists,Please Login",success:false});
        }
        //if user not exist creating new one
        const newUser = new Userdb({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        await newUser.save();
        
        res.status(201).send({ message: "User registered successfully.", success: true, user: newUser });
    } catch (error) {
        console.error("Error", error);
        res.status(500).send({ message: "Error while creating the user", success: false, error });
    }
});

export default router;
