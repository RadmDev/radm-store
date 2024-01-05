import { retrieveData, updateData } from "@/lib/firebase/service";

export const GET = async () => {
  const users = await retrieveData("users");
  const data = users?.map((user) => {
    delete user.password;
    return user;
  });

  return Response.json(
    {
      status: true,
      statusCode: 200,
      message: "Success to get user",
      data,
    },
    {
      status: 200,
    }
  );
};

export const PUT = async (request) => {
  try {
    const { id, data } = await request.json();

    const result = await updateData("users", id, data);

    if (result) {
      return Response.json(
        {
          status: true,
          statusCode: 200,
          message: "Success to update user",
        },
        {
          status: 200,
        }
      );
    } else {
      return Response.json(
        {
          status: false,
          statusCode: 400,
          message: "Failed to update user",
        },
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    return Response.json(
      {
        status: false,
        statusCode: 400,
        message: error.message,
      },
      {
        status: 400,
      }
    );
  }
};
