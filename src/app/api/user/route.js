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
