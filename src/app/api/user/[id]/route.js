import { deleteData, updateData } from "@/lib/firebase/service";
import { verifyJwt } from "@/lib/jwt/services";

export const PUT = async (request, params) => {
  try {
    const { id } = params.params;
    const { data } = await request.json();
    const token = request.headers.get("Authorization").split(" ")[1] || "";
    const secret = process.env.NEXTAUTH_SECRET;

    const properties = {
      token,
      secret,
    };

    const decodedData = verifyJwt(properties);

    if (decodedData !== null && decodedData.role === "admin") {
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
    } else {
      return Response.json(
        {
          status: false,
          statusCode: 403,
          message: "Access Denied",
        },
        {
          status: 403,
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

export const DELETE = async (request, params) => {
  try {
    const { id } = params.params;
    const token = request.headers.get("Authorization").split(" ")[1] || "";
    const secret = process.env.NEXTAUTH_SECRET;

    const properties = {
      token,
      secret,
    };

    const decodedData = verifyJwt(properties);

    if (decodedData !== null && decodedData.role === "admin") {
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
            message: "Failed to delete user",
          },
          {
            status: 400,
          }
        );
      }
    } else {
      return Response.json(
        {
          status: false,
          statusCode: 403,
          message: "Access Denied",
        },
        {
          status: 403,
        }
      );
    }
  } catch (error) {
    return Response.json(
      {
        status: false,
        statusCode: 500,
        message: "Failed to delete user",
      },
      {
        status: 500,
      }
    );
  }
};
