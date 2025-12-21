import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"; 
const userSchema = new Schema(
    {
        username : {
            type : String, 
            required : true,
            unique : true,
            lowercase : true, 
            trim : true,
            minlength : 8,
            maxlength : 30  
        }, 
        password : {
            type : String, 
            required : true,
            minlength : 6,
            maxlength : 15 
        },
        email : {
            type : String, 
            required : true,
            unique : true,
            lowercase : true,
            trim : true
        }
    }, 
    {
        timestamps: true
    }
)
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});


    
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}
export const user = mongoose.model("User", userSchema)