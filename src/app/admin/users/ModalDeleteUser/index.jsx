"use client";

import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";
import React from "react";

const ModalDeleteUser = (props) => {
  const { deletedUser, setDeletedUser } = props;

  const { data } = useSession();

  const handleConfirm = (id, token) => {
    userServices.deleteUser(id, token);
    setDeletedUser({});
  };

  return (
    <Modal onClose={() => setDeletedUser({})}>
      <h1 className="text-2xl text-center font-semibold mb-10">
        Are you sure?
      </h1>
      <div className="max-w-xs">
        <Button
          type="button"
          onClick={() => handleConfirm(deletedUser?.id, data?.accessToken)}
          className="p-3"
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default ModalDeleteUser;
