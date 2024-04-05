const regexEmail = require("./regexEmail");

const ValidateSignUpDetails = ({
  name,
  email,
  username,
  password,
  role,
  department,
}) => {
  return new Promise((resolve, reject) => {
    if (!name) reject("name is missing");
    if (!username) reject("username is missing");
    if (!email) reject("email is missing");
    if (!password) reject("password is missing");
    if (!role) reject("role is missing, please set a role");
    if (!department)
      reject("department is missing, please set your department");

    if (typeof name !== "string")
      reject("name has invalid type, Try again with text input");
    if (typeof username !== "string")
      reject("username has invalid type, Try again with text input");
    if (typeof email !== "string")
      reject("email has invalid type, Try again with text input");
    if (typeof password !== "string")
      reject("password has invalid type, Try again with text input");

    if (username.length < 5 || username.length > 50)
      reject("username length must be between 5 and 50 characters");
    if (email.length < 5 || email.length > 50)
      reject("email length must be between 5 and 50 characters");
    if (password.length < 8 || password.length > 50)
      reject("password length must be between 8 and 50 characters");

    // double check roles enum
    if (role !== "admin" && role !== "employee" && role !== "manager")
      reject(
        "role must be 'admin' or 'employee' or 'manager', Please configure and try again."
      );
    // Checking for regex
    if (!regexEmail(email))
      reject("email address is of invalid format, please check and try again");
    // if (!regexPassword(password))
    //   reject(
    //     "Password must contain at least 1 special character, 1 upper and 1 lower case letters and 1 number, it should be minimum 8 letters long"
    //   );
    resolve();
  });
};

module.exports = ValidateSignUpDetails;
