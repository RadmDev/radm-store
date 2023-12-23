import { signUp } from "@/services/auth";

// export const GET = async () => {
//   return Response.json({ status: 201 }, { message: "created success" });
// };

export const POST = async (request) => {
  const { email, fullname, phone, password } = await request.json();

  const data = {
    email,
    fullname,
    phone,
    password,
  };

  const signUpResult = await signUp(data);

  if (signUpResult.status) {
    return Response.json(
      {
        message: signUpResult.message,
        status: true,
      },
      { status: 200 }
    );
  } else {
    return Response.json(
      {
        message: signUpResult.message,
        status: false,
      },
      { status: 400 }
    );
  }
};
