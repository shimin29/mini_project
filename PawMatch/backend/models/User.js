const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
    },
    {
        timestamps: true,
    },
);

UserSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        return next;
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next;
});
UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("user", UserSchema);
module.exports = User;
