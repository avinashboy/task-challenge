const { cleanEscape } = require("../helper");
const {
  createUser,
  saveHashPassword,
  getDataInfo,
  deleteUser
} = require("../transaction/user.transaction");
const { v4: uuidv4 } = require("uuid");
const randomstring = require("randomstring");
const { mailVerificationSecretKey } = require("../middleware/jwt");
const { sendMail,forgotMail } = require("../mail");
const bcrypt = require("bcrypt");

module.exports = {
  signup: async ({ mail, name }) => {
    const cleanEmail = cleanEscape(mail);
    const cleanName = cleanEscape(name);

    const password = randomstring.generate({
      length: 12,
      charset: "alphabetic",
    });
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const uuid = uuidv4();

    const userInfo = {
      username: cleanName,
      uuid,
      email: cleanEmail,
      password: hashedPassword,
      confirmationCode: mailVerificationSecretKey(uuid),
    };
    const sendEmailInfo = {
      name: userInfo.username,
      email: userInfo.email,
      password,
      code: userInfo.confirmationCode,
    };
    await sendMail(sendEmailInfo);
    const message = await createUser(userInfo);
    return message;
  },

  savePassword: async ({ currentPassword, uuid }) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(currentPassword, saltRounds);
    const status = await saveHashPassword({
      hashPassword: hashedPassword,
      uuid,
    });
    return status;
  },

  forgotPassword: async ({ email, uuid }) => {
    const info = await getDataInfo({uuid, code:mailVerificationSecretKey(uuid)})
    const {username, confirmationCode} = info

    const sendEmailInfo = {name: username,email: email, code: confirmationCode, };
    await forgotMail(sendEmailInfo)
    return {message: "Successful Sent Email"}
  },

  checkUserIfExistAndDelete: async ({ uuid }) => {
    const state = await deleteUser({ uuid });
    if(state) return {message: "Successful Deleted"}
    return {message: "User not found"}
  },

  // checkUserIfExistAndEdit: async ({ uuid, email, password }) => {

  // }
};
