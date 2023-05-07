const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bycrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
      validade(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      trim: true,
      required: true,
      minlenght: 7,
      select: false,
    },
    document: {
      type: String,
      trim: true,
      required: true,
      minlenght: 9,
      maxlenght: 11,
    },
    wallet: {
      type: String,
      required: true,
    },
    moneyOffer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MoneyOffer",
      required: false,
    },
  },
  { timestamps: true }
);

userSchema.virtual("invites", {
  ref: "MoneyOffer",
  localField: "_id",
  foreignField: "invites",
});



userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: 2 * 60 * 60,
  });

  return token;
};

userSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("Não foi possível achar usuario");
  }

  const isMatch = await bycrypt.compare(password, user.password);


  if (!isMatch) {
    throw new Error("Senhas não conferem");
  }

  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bycrypt.hash(user.password, 8);
  }

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
