"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";
import { useState } from "react";

const ModalUpdateUser = (props) => {
  const { updatedUser, setUpdatedUser } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { data } = useSession();

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const inputedData = {
      role: e.target.role.value,
    };

    try {
      const result = await userServices.updateUser(
        updatedUser?.id,
        inputedData,
        data?.accessToken
      );

      console.log(result);

      if (result.data.status) {
        setIsLoading(false);
        setUpdatedUser({});
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Modal onClose={() => setUpdatedUser({})}>
      <h1 className="text-2xl text-center font-semibold mb-10">Update User</h1>
      <form onSubmit={handleUpdateUser}>
        <Input
          type="email"
          name="email"
          label="Email"
          required
          defaultValue={updatedUser?.email}
          disabled
          className="disabled:cursor-not-allowed disabled:opacity-70"
        />
        <Input
          type="text"
          name="fullname"
          label="Fullname"
          required
          defaultValue={updatedUser?.fullname}
          disabled
          className="disabled:cursor-not-allowed disabled:opacity-70"
        />
        <Input
          type="number"
          name="phone"
          label="Phone"
          required
          defaultValue={updatedUser?.phone}
          disabled
          className="disabled:cursor-not-allowed disabled:opacity-70"
        />
        <Select
          name="role"
          label="Role"
          defaultValue={updatedUser?.role}
          options={[
            {
              label: "Member",
              value: "member",
            },
            {
              label: "Admin",
              value: "admin",
            },
          ]}
        />
        <Button type="submit" className="p-3">
          Update
        </Button>
      </form>
    </Modal>
  );
};

export default ModalUpdateUser;
