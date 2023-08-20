import { Schema, model } from "mongoose";
import { hash, compareSync } from "bcrypt";

const stylistSchema = new Schema({
  name: String,
  title: String,
  bio: String,
  image_url: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  appointments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Appointments",
    },
  ],
});

stylistSchema.pre("save", function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = hash(this.password, saltRounds);
  }
  next();
});

adminSchema.methods.isCorrectPassword = function (password) {
  return compareSync(password, this.password);
};

const Stylist = model("Stylist", stylistSchema);

export default Stylist;
