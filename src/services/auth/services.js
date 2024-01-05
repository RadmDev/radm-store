import { addData, retrieveDataByField } from "@/lib/firebase/service";
import bcrypt from "bcrypt";

// register user
export const signUp = async (userData) => {
  const user = await retrieveDataByField("users", "email", userData.email);

  if (user.length > 0) {
    return {
      status: false,
      statusCode: 400,
      message: "Email already exists",
    };
  } else {
    if (!userData.role) {
      userData.role = "member";
    }

    userData.password = await bcrypt.hash(userData.password, 10);
    userData.createdAt = new Date();
    userData.updatedAt = new Date();

    const result = await addData("users", userData);

    if (result) {
      return {
        status: true,
        statusCode: 200,
        message: "User created successfully",
      };
    } else {
      return {
        status: false,
        statusCode: 400,
        message: "Failed to register user",
      };
    }
  }
};

// login
export const signIn = async (userData) => {
  const data = await retrieveDataByField("users", "email", userData.email);

  if (data.length > 0) {
    return data[0];
  } else {
    return null;
  }
};

// login with google
export const loginWithGoogle = async (data, callback) => {
  const user = await retrieveDataByField("users", "email", data.email);

  if (user.length > 0) {
    callback(user[0]);
  } else {
    data.role = "member";
    data.createdAt = new Date();
    data.updatedAt = new Date();
    data.password = "";
    await addData("users", data, (result) => {
      if (result) {
        callback(data);
      }
    });
  }
};
