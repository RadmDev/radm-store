import { signUp } from "@/services/auth/services";

export const POST = async (request) => {
  const { email, fullname, phone, password } = await request.json();

  const data = {
    email,
    fullname,
    phone,
    password,
  };

  const signUpSuccess = {
    status: true,
    statusCode: 200,
    message: "User created successfully",
  };

  const signUpFailed = {
    status: false,
    statusCode: 400,
    message: "Failed to register user",
  };

  const result = await signUp(data);

  if (result.status) {
    return Response.json(signUpSuccess, { status: 200 });
  } else {
    return Response.json(signUpFailed, { status: 400 });
  }
};
