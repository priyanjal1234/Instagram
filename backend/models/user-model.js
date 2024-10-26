const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      trim: true,
      default: "",
    },
    profilePicture: {
      type: String,
      default: "khaali.jpg",
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    isPrivate: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
  },
  { timestamps: true }
);

function validateUser(data) {
  let schema = Joi.object({
    name: Joi.string().min(3).max(30).trim().required().messages({
      "string.base": "Name should be a string.",
      "string.empty": "Name cannot be empty.",
      "string.min": "Name should have at least 3 characters.",
      "string.max": "Name should have at most 30 characters.",
      "any.required": "Name is required.",
    }),

    username: Joi.string()
      .alphanum()
      .min(3)
      .max(20)
      .trim()
      .required()
      .messages({
        "string.base": "Username should be a string.",
        "string.empty": "Username cannot be empty.",
        "string.alphanum": "Username must contain only letters and numbers.",
        "string.min": "Username should have at least 3 characters.",
        "string.max": "Username should have at most 20 characters.",
        "any.required": "Username is required.",
      }),

    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.base": "Email should be a string.",
        "string.empty": "Email cannot be empty.",
        "string.email": "Please provide a valid email address.",
        "any.required": "Email is required.",
      }),

    password: Joi.string()
      .min(6)
      .max(30)
      .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
      .required()
      .messages({
        "string.base": "Password should be a string.",
        "string.empty": "Password cannot be empty.",
        "string.min": "Password should have at least 6 characters.",
        "string.max": "Password should have at most 30 characters.",
        "string.pattern.base": "Password can only contain letters and numbers.",
        "any.required": "Password is required.",
      }),
  });
  return schema.validate(data);
}

function validateLogin(logindata) {
  const loginSchema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.base": "Email should be a string.",
        "string.empty": "Email cannot be empty.",
        "string.email": "Please provide a valid email address.",
        "any.required": "Email is required.",
      }),

    password: Joi.string()
      .min(6)
      .max(30)
      .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
      .required()
      .messages({
        "string.base": "Password should be a string.",
        "string.empty": "Password cannot be empty.",
        "string.min": "Password should have at least 6 characters.",
        "string.max": "Password should have at most 30 characters.",
        "string.pattern.base": "Password can only contain letters and numbers.",
        "any.required": "Password is required.",
      }),
  });
  return loginSchema.validate(logindata)
}

let userModel = mongoose.model("user", userSchema);

module.exports = { userModel, validateUser,validateLogin };
