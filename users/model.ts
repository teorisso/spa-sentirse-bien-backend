import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
        ],
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["cliente", "admin", "profesional"],
        default: "cliente",
    },
    is_admin: {
        type: Boolean,
        default: false,
    },
});

UserSchema.pre("save", async function (next) {
    try {
        const hashedPassword = await bcrypt.hash(this.password ?? "", 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        console.error(error);
    }
});

const User = model("User", UserSchema);

export default User;