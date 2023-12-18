import { signUp } from "@/services/auth";

export const POST = async (request) => {
  const { email, fullname, phone, password } = await request.json();

  const data = {
    email,
    fullname,
    phone,
    password,
  };

  // console.log({ data });
  await signUp(data, (status) => {
    if (status) {
      return new Response({
        status: true,
        statusCode: 200,
        message: "User created successfully",
      });
    } else {
      return new Response({
        status: false,
        statusCode: 400,
        message: "Failed to register user",
      });
    }
  });
};
