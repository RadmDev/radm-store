"use client";

import Button from "@/components/ui/Button";
import userServices from "@/services/user";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import ModalDeleteUser from "./ModalDeleteUser";
import ModalUpdateUser from "./ModalUpdateUser";

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [updatedUser, setUpdatedUser] = useState({});
  const [deletedUser, setDeletedUser] = useState({});

  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await userServices.getAllUsers();
      setUsers(data.data);
    };
    getAllUsers();
  }, [users]);

  return (
    <>
      <div>
        <h1 className="text-3xl font-semibold">User Management</h1>
        <table className="w-full mt-10 border-spacing-0 border-collapse border border-color-white-2">
          <thead>
            <tr className="bg-color-white-2">
              <th className="text-left p-2">#</th>
              <th className="text-left p-2">Fullname</th>
              <th className="text-left p-2">Email</th>
              <th className="text-left p-2">Phone</th>
              <th className="text-left p-2">Role</th>
              <th className="text-left p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={index} className={index % 2 === 1 && "bg-color-white-2"}>
                <td className="text-left p-2">{index + 1}</td>
                <td className="text-left p-2">{user.fullname}</td>
                <td className="text-left p-2">{user.email}</td>
                <td className="text-left p-2">{user.phone}</td>
                <td className="text-left p-2">{user.role}</td>
                <td className="text-left p-2 flex gap-3">
                  <div className="flex gap-3">
                    <Button
                      type="button"
                      onClick={() => setUpdatedUser(user)}
                      variant="bg-color-yellow text-color-black-1"
                      className="p-4"
                    >
                      <FaEdit size={20} />
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setDeletedUser(user)}
                      variant="bg-color-red text-color-white-1"
                      className="p-4"
                    >
                      <FaTrash size={20} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {Object.keys(updatedUser).length > 0 && (
        <ModalUpdateUser
          updatedUser={updatedUser}
          setUpdatedUser={setUpdatedUser}
        />
      )}
      {Object.keys(deletedUser).length > 0 && (
        <ModalDeleteUser
          deletedUser={deletedUser}
          setDeletedUser={setDeletedUser}
        />
      )}
    </>
  );
};

export default AdminUsersPage;
