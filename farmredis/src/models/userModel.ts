import mongoose, { CallbackError, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  profilePic?: {
    public_id?: string;
    url?: string;
  };
  role: "customer" | "admin" | "farmer";
  isValidPassword(password: string): Promise<boolean>;
  generateJWT(): string;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minLength: [6, "password length should be greadter then 6 character"],
    },
    address: {
      type: String,
      required: [true, "address is required"],
    },

    phone: {
      type: String,
      required: [true, "phone no is required"],
    },
    profilePic: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    role: {
      type: String,
      enum: ["customer", "admin", "farmer"],
      default: "customer",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error as CallbackError);
  }
});

userSchema.methods.isValidPassword = async function (password: string) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};
// token generate
userSchema.methods.generateJWT = function () {
  return JWT.sign(
    {
      _id: this._id,
    },
    process.env.JWT_SECRET as string
  );
};
export const userModel = mongoose.model<IUser>("Users", userSchema);
export default userModel;
