import mongoose from "mongoose";

const {Schema, model}=mongoose;

const taskModelSchema=Schema({
    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    isCompleted:{
        type:Boolean,
        required:true,
        default:false
    }
});

const TodoModel= model("task",taskModelSchema);
// module.exports= todoModel;
export default TodoModel
