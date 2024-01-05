import instance from "@/lib/axios/instance";

const userServices = {
  getAllUsers: () => instance.get("/api/user"),
  updateUser: (id, data) => instance.put(`/api/user`, { id, data }),
  deleteUser: (id) => instance.delete(`/api/user/${id}`),
};

export default userServices;
