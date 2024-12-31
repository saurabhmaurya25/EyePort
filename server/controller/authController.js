import { validationResult } from "express-validator";
import bcrypt from 'bcryptjs';
import User from "../models/user.js";
import Cart from "../models/cart.js";
import Wishlist from "../models/wishlist.js";
import Order from "../models/order.js";
import { generateToken,generateTempToken,verifyToken } from "../config/secret.js";

const signup = async (req,res) => {
    // console.log("Request body: ", req.body);
    let success = false;
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.json({errors: errors.array() });
    }

    const {username, email, password, phone} = req.body;
    const address = '';
    const gender = '';
    try{
        let user1 = await User.findOne({email});
        let user2 = await User.findOne({phone});
        if(user1){
            return res.json({success, error: "User already register with this email id"});
        } if(user2){
            return res.json({success, error: "User with this phone no already registered"});
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password,salt);
            let user = new User({
                username,
                email,
                password: hashedPassword,
                address,
                phone,
                gender,
            });

            await user.save();

            success = true;
            return res.json({ success , message: "You are sign in successfully"});
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
};

const login = async (req,res) => {
    let success = false;
    const errors = validationResult(req);  

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {email, password} = req.body;
    try{
        let user = await User.findOne({ email });
        if(!user){
            return res.json({ success, error: "User not registered; plz register first"});
        }

        const pwdCompare = await bcrypt.compare(password,user.password);
        if(!pwdCompare){
            return res.json({success, error: "Your password is incorrect"});
        }

        //if we reach here, it means email and password are correct
        success = true;
        const authToken = generateToken(user.id);
        res.json({success, authToken,user});
    } catch(error){
        console.log(error.message);
        res.status(500).send("Server error");
    }
};

const getUserData = async (req,res) => {
    const token = req.headers.authorization;
    //now verify and decode this token

    if(token){
        try{
            const decode = verifyToken(token);
            
            //now extact userId from the decode token
            const userId = decode.user.id;

            //Fetch user data from our database
            const user = await User.findById(userId);

            if(!user){
                return res.json({message: "User not found"});
            }
            user.password = undefined; //so that no one can get the password

            //return user data as json
            res.json({success: true, data: user});
        }
        catch(error){
            return res.json({message: "Invalid or expired token"});
        }
    }
    else{
        return res.json({message: "Token not provided"});
    }
}

const forgotPassword = async (req, res) => {
    console.log("I am in forgot password in backend");
    return res.status(200).json({success:false, message: "We are working on forgot password sorry"});
}

const changePassword = async (req,res) => {
    try {

        const { userId, currentPassword, newPassword } = req.body;

        if (!userId || !currentPassword || !newPassword) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        // Fetch the user from the database
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        // Check if the current password matches the user's stored password
        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Current password is incorrect." });
        }

        // Check if the new password is different from the current password
        const isSamePassword = await bcrypt.compare(newPassword, user.password);

        if (isSamePassword) {
            return res.status(400).json({ success: false, message: "New password cannot be the same as the current password." });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update the user's password
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ success: true, message: "Password changed successfully." });
    } catch (error) {
        console.error("Error in changePassword:", error);
        res.status(500).json({ success: false, message: "An error occurred while changing the password." });
    }
};

const addAddress = async (req, res) => {
    // console.log(req.body);
    try {
      const { userId, fullName,flat,landmark,street,city,state,postalCode,country,mobileNo,isDefault } = req.body;
      const address = {
        fullName: fullName,
        mobileNo: mobileNo,
        flat: flat,
        landmark: landmark,
        street: street,
        city: city,
        state: state,
        postalCode: postalCode,
        country: country,
        isDefault: isDefault
      }
      if (!userId || !address) {
        return res.status(400).json({success:false, message: "User ID and address are required" });
      }
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      // Check if the address already exists
      const isDuplicate = user.addresses.some((addr) => 
        addr.fullName === address.fullName &&
        addr.mobileNo === address.mobileNo &&
        addr.flat === address.flat &&
        addr.landmark === address.landmark &&
        addr.street === address.street &&
        addr.city === address.city &&
        addr.state === address.state &&
        addr.postalCode === address.postalCode &&
        addr.country === address.country
      );
  
      if (isDuplicate) {
        return res.status(400).json({success:false, message: "This address already exists" });
      }
  
      // Handle the default address logic
      if (address.isDefault) {
        // Ensure only one default address exists by resetting others
        user.addresses.forEach((addr) => (addr.isDefault = false));
      }
  
      // Add the new address to the user's address array
      user.addresses.push(address);
  
      // Save the updated user document
      await user.save();
  
      return res.status(200).json({address: user.addresses[user.addresses.length - 1],success:true, message: "Address added successfully"});
    } catch (error) {
      console.error("Error adding address:", error);
      return res.status(500).json({success:false, message: "Internal server error" });
    }
  };

  const updateAddress = async (req, res) => {
    // console.log(req.body);
    try {
      const { userId, _id, fullName, flat, landmark, street, city, state, postalCode, country, mobileNo, isDefault } = req.body;
  
      // Validate required fields
      if (!userId || !_id) {
        return res.status(400).json({ success:false,message: "User ID and Address ID are required" });
      }
  
      // Find the user by userId
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      // Find the specific address in the user's addresses
      const address = user.addresses.id(_id);
  
      if (!address) {
        return res.status(404).json({success:false, message: "Address not found" });
      }
  
      // Update the fields if they are provided in the request
      address.fullName = fullName;
      address.flat = flat;
      address.landmark = landmark;
      address.street = street;
      address.city = city;
      address.state = state;
      address.postalCode = postalCode;
      address.country = country;
      address.mobileNo = mobileNo;
      address.isDefault = isDefault;
  
      // If `isDefault` is true, reset all other addresses' `isDefault` to false
      if (isDefault) {
        user.addresses.forEach((addr) => {
          if (addr._id.toString() !== _id) {
            addr.isDefault = false;
          }
        });
      }
  
      // Save the updated user document
      await user.save();
  
      res.status(200).json({address,success: true, message: "Address updated successfully" });
    } catch (error) {
      res.status(500).json({success:false, message: error.message });
    }
  };
  

const deleteAddress = async (req, res) => {
    try {
        const { userId, addressId } = req.body;

        // Validate input
        if (!userId || !addressId) {
            return res.status(400).json({ success:false,message: "User ID and Address ID are required" });
        }

        // Find the user by ID and update their addresses
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $pull: { addresses: { _id: addressId } } }, // Remove the address with the matching _id
            { new: true } // Return the updated user
        );

        if (!updatedUser) {
            return res.status(404).json({success:false, message: "User not found" });
        }

        // Return the updated addresses
        res.status(200).json({
            success:true,
            message: "Address deleted successfully"
        });
    } catch (error) {
        res.status(500).json({success:false, message: "Server error" });
    }
};

const changePhone = async (req, res) => {
    console.log(req.body);
    try {
        const { userId, newPhone, password } = req.body;
        // Validate input
        if (!userId || !newPhone || !password) {
            return res.status(400).json({ success:false,message: "Some info missing in backend" });
        }
        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({success:false, message: "User not found." });
        }

        // Check if the provided password matches the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({success:false, message: "Invalid password." });
        }

        // Update the phone number
        user.phone = newPhone;
        await user.save();

        user.password = undefined;
        res.status(200).json({success:true, message: "Phone number updated successfully." });
    } catch (error) {
        console.error("Error in changePhone:", error);
        res.status(500).json({ success:false,message: "Server error. Please try again later." });
    }
};

const updateProfile = async (req, res) => {
    try {
        
        const { id, name, address, phone, gender } = req.body; // Extract data from request body
        const userId = id;
        console.log("UserId is: ",userId);
        // Update the user in the database

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                username: name,
                address,
                phone,
                gender,
            },
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: 'Failed to update profile' });
    }
};

const userList = async (req,res) => {
    try{
        const users = await User.find();
        return res.status(200).json({
            success: true,
            message: 'List of all registered users',
            data: users
          });
    } catch(error){
        console.error("Error in userList:", error);
        res.status(500).json({success:false, message: 'Failed to fetch users' });
    }
}

const getUserById = async (req, res) => {
    //here we will extract each and every details of a user which is clicked by admin
    // each and every means his cart, his orders, his wishlist, his profile details etc
}


export {signup, login, getUserData,updateProfile,forgotPassword,changePhone,changePassword,addAddress,updateAddress,deleteAddress,userList,getUserById};