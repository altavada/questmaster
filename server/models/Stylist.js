const { Schema, model } = require("mongoose");
const { hash, compareSync } = require("bcrypt");

const stylistSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  bio: {
    type: String,
    trim: true,
  },
  image_url: String,
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: {
    type: String,
    required: true,
  },
  adminKey: {
    type: String,
    default: "default",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  appointments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
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

stylistSchema.pre("save", function (next) {
  if (this.isNew && this.adminKey === "skipper") {
    this.isAdmin = true;
    this.adminKey = "default";
  }
  next();
});

stylistSchema.methods.isCorrectPassword = function (password) {
  return compareSync(password, this.password);
};

const Stylist = model("Stylist", stylistSchema);

module.exports = Stylist;
