import mongoose from "mongoose";

const { Schema } = mongoose;

const AddressSchema = new Schema({
  fullName: { type: String, required: true }, // Full name of the recipient
  mobileNo: { type: String, required: true }, // Mobile number for the address
  flat: { type: String }, // Flat number or apartment details
  landmark: { type: String }, // Landmark for easier identification
  street: { type: String, required: true }, // Street name or number
  city: { type: String, required: true }, // City
  state: { type: String, required: true }, // State
  postalCode: { type: String, required: true }, // Postal/ZIP code
  country: { type: String, required: true }, // Country
  isDefault: { type: Boolean, default: false }, // Indicates if this is the default address
});

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    addresses: {
      type: [AddressSchema], // Array of addresses
      default: [],
    },
    gender: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "User"],
      required: true,
      default: "User",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
