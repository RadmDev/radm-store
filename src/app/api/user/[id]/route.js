import { deleteData } from "@/lib/firebase/service";

export const DELETE = async (request, params) => {
  try {
    const { id } = params.params;

    const result = await deleteData("users", id);

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
        message: "Failed to update user",
      },
      {
        status: 400,
      }
    );
  }
};
