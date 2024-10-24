import { User } from "../models/User.js";  // Ensure correct path

export const addUser = async (req, res) => {
  const { fullname, number } = req.body;

  try {
    // Validate the input
    if (!fullname || !number) {
      return res.status(400).json({ message: 'Full name and phone number are required.' });
    }

    const isExist = await User.findOne({ number });

    if (isExist) {
      return res.status(409).json({ message: 'Phone number already in use' });
    }

    // Create a new user
    const newUser = await User.create({
      fullname,
      number,
    });

    return res.status(201).json({
      message: "Now you are the member of this gym.",
      user: newUser,
    });

  } catch (err) {
    console.error(`Error: ${err.message}`);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getAllUsers = async (req, res) => {

  try {
    const users = await User.find({});
    return res.status(200).json(users)
  } catch (err) {
    return res.status(400).json(`message: ${err}`)
  }
}
