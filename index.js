import express  from "express";
import TodoModel from "./schema/taskModel.js";
import  mongoose  from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app= express();
app.use(cors());
app.use(express.json());
const port= process.env.PORT || 8000

const MONGODB_URI= "mongodb+srv://raf:raf123@cluster0.l1ltl.mongodb.net/myDatabase?retryWrites=true&w=majority"
mongoose.connect(MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(()=>{
    console.log("DB conected successfully")
}).catch ((error)=>{
    console.log(error);
});
app.get('/', (req, res) => {
    return res.status(200).json({
        message: 'Welcome to the todo API.'
    })
})

app.get("/tasks", async(req,res)=>{
  const todoModel= await TodoModel.find({});

if(todoModel){
  return  res.status(200).json({
        // status=true,
        message:"all toos fetched.....",
        data:todoModel
    })
}else{
    return  res.status(400).json({
        // status=false,
        message:"all toos fetched....."
    })
    
}
    // res.send(req.body)
    // console.log(req.body.name)
})

// mongodb+srv://raf:raf123@cluster0.l1ltl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

app.post("/create",async(req,res)=>{
    const {title,description, isCompleted} = req.body;
    const todoModel=await TodoModel.create({
        title,
        description,
        isCompleted
    })
   
    if(todoModel){
        return res.status(201).json({
            status:true,
            message:"Todo Created succesfully",
            data:todoModel
        })
    }else{
return res.status(400).json({
    status:false,
    meassage:"Todo not created"
})
    }


});
app.patch("/tasks/:id",async(req,res)=>{
    const {id}=req.params;
    const {isCompleted}=req.body;

    const todoModel= await TodoModel.updateOne({isCompleted:isCompleted}).where({_id:id})

    if(todoModel){
        return res.status(200).json({
            status:true,
            message:"Todo updated succesfully",
            data:todoModel
        })
    }else{
        return res.status(400).json({
            status:false,
            message:"Unable to Delete updated todo",
            data:todoModel
        })

    }

})

app.delete("/tasks/:id",async(req,res)=>{
    const {id}=req.params;

    const todoModel= await TodoModel.findByIdAndDelete({_id:id})

    if(todoModel){
        return res.status(200).json({
            status:true,
            message:"Todo delated succesfully",
            data:todoModel
        })
    }else{
        return res.status(400).json({
            status:false,
            message:"Unable to Delete Toto",
            data:todoModel
        })

    }

})



app.listen(port,()=>{
console.log(`Server running at localhost:${8000}`)
})