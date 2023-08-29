import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists'],
        required: [true, 'Email is required'],
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, 'Username must contain at least 8 alphanumeric characters and be unique'],
    },
    image: {
        type: String,
    }
});

{/* Including " models.User || " -> This additional check is necessary for Next.js to work, 
since the connection is established everytime from scratch. So we always have to check if 
the model already exists, if not create it.*/}

const User = models.User || model("User", userSchema);

export default User;