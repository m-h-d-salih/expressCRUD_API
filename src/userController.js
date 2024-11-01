import { comparepassword, hashPassword } from "./bcrypt.js";
import { generateToken } from "./token.js";
import User from "./usermodel.js";

export const signup = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const checkemail = await User.findOne({ email });
    if (checkemail)
      return res.status(401).json({ message: `user already exist` });
    const hashedpassword = await hashPassword(password);
    const user = new User({ email, name, password: hashedpassword });
    await user.save();
    return res
      .status(200)
      .json({ message: `user created successfully`, data: user });
  } catch (error) {
    return res.status(500).json({ message: `internal server error ${error}` });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: `user doesnot exist` });
    const comparedpassword = await comparepassword(password, user.password);
    if (!comparedpassword)
      return res
        .status(404)
        .json({ message: `password or email is incorrect` });
    const token = generateToken(user.id);
    return res
      .status(200)
      .json({ message: `user login successfully`, data: user, token });
  } catch (error) {
    return res.status(500).json({ message: `internal server error ${error}` });
  }
};
export const logout = async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res
      .status(200)
      .json({ success: true, message: "user logout successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: `internal server error ${error}` });
  }
};
