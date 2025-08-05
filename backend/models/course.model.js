import mongoose from "mongoose";

const courseSchema=new mongoose.Schema(
    {

        title:
        {
            type: String,
            required:true,
        },

         description:
        {
            type: String,
            required:true,
        },

         price:
        {
            type: String,
            required:true,
        },

         image:
        {
            public_id:
            {
                 type: String,
            required:true,
            },
            url: 
            {
                 type: String,
            required:true,
            }
        },
        creatorId:
        {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
    }
);
 const Course=mongoose.model("Course",courseSchema);
 export default Course;
//converting courseschema into models storing in course afterwards using
