const { response } = require("express");
const User = require("../models/user.model");
const Patient = require("../models/patient.model");
const bcrypt = require("bcryptjs");
const { JWTGenerated } = require("../helpers/JWT.helpers");
const { googleTokenVerify } = require("../helpers/google-token-verify.helpers");
const { getSideNavOptions } = require("../helpers/sideNavOptions");

const login = async (req, resp = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return resp.status(400).json({
        ok: false,
        message: "You must check your credentials",
      });
    }

    const validatePassword = bcrypt.compareSync(password, user.password);

    if (!validatePassword) {
      return resp.status(400).json({
        ok: false,
        message: "You must check your credentials",
      });
    }

    const token = await JWTGenerated(user.id, user.rol);
    const menu = getSideNavOptions(user.rol);

    return resp.status(200).json({
      ok: true,
      message:`Wellcome ${user.name} ${user.lastname}`,
      token,
      menu,
      user,
    });
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message:
        "Unexpected error, mail to jonasjosuemoralese@gmail.com to talk out it",
    });
  }
};
const googleSignIn = async (req, resp = response) => {
  try {
    const { email } = await googleTokenVerify(req.body.token);
    const user = await User.findOne({ email });

    if (!user) {
      return resp.status(403).json({
        ok: false,
        message: "User Forbidden",
      });
    }

    const token = await JWTGenerated(user.id);
    const menu = getSideNavOptions(user.rol);
    
    return resp.status(200).json({
      ok: true,
      message:`Wellcome ${user.name} ${user.lastname}`,
      token,
      user,
      menu
    });
      
  } catch (error) {
    return resp.status(400).json({
      ok: false,
      message: "Google identity verify: Token error",
    });
  }
};

const loginPatient = async (req, resp = response) => {
  const { email, password } = req.body;

  try {
    const user = await Patient.findOne({ email });

    if (!user) {
      return resp.status(400).json({
        ok: false,
        message: "You must check your credentials",
      });
    }

    const validatePassword = bcrypt.compareSync(password, user.password);

    if (!validatePassword) {
      return resp.status(400).json({
        ok: false,
        message: "You must check your credentials",
      });
    }

    const token = await JWTGenerated(user.id, user.rol);
    const menu = getSideNavOptions(user.rol);

    return resp.status(200).json({
      ok: true,
      message: `Wellcome ${user.name} ${user.lastname}`,
      token,
      user,
      menu
    });
      
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message: "Unexpected error, mail to jonasjosuemoralese@gmail.com to talk out it",
    });
  }
};

const googleSignInPatient = async (req, resp = response) => {
  try {
    const { email } = await googleTokenVerify(req.body.token);
    const user = await Patient.findOne({ email });

    if (!user) {
      return resp.status(403).json({
        ok: false,
        message: " User Forbidden",
      });
    }

    const token = await JWTGenerated(user.id);
    const menu = getSideNavOptions(user.rol);
    console.log(menu);
    return resp.status(200).json({
      ok: true,
      message:`Wellcome ${user.name} ${user.lastname}`,
      token,
      user,
      menu
    });
      
  } catch (error) {
    return resp.status(400).json({
      ok: false,
      message: "Google identity verify: Token error",
    });
  }
};

const renewToken = async (req, resp = response) => {
  const user_id = req.user_id;
  const token = await JWTGenerated(user_id);
  const user = await User.findById(user_id);
  if (!user) {
    const user = await Patient.findById(user_id);
    const menu = getSideNavOptions(user.rol);

    return resp.status(200).json({
      ok: true,
      message: "This is your new token",
      token,
      user,
      menu,
    });
  }
  const menu = getSideNavOptions(user.rol);

  return resp.status(200).json({
    ok: true,
    message: "This is your new token",
    token,
    user,
    menu,
  });
};

module.exports = {
  login,
  googleSignIn,
  renewToken,
  loginPatient,
  googleSignInPatient,
};
