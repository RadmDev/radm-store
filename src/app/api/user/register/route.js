import { getFirestoreData, signUp } from "@/lib/service";

export const POST = async (request) => {
  try {
    const { email, fullname, phone, password } = await request.json();

    const data = {
      email,
      fullname,
      phone,
      password,
    };

    // console.log({ data });
    const createUser = await signUp(data);

    if (createUser.status) {
      return new Response(JSON.stringify(createUser), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify(createUser), {
        status: 400,
      });
    }
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  }
};
