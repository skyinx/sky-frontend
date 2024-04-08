import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import ConfirmDelete from "@/components/common/delete/ConfirmDelete";
import { del } from "@/api";

const Delete = ({ id, title, module = "", getData = async () => {} }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onConfirm = async () => {
    try {
      setLoading(true);
      await del({ module, action: "delete", parameters: [id] });
      await getData();
    } catch (error) {
      console.error("Delete Error: ", error);
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  const onDecline = () => {
    setOpen(false);
  };
  return (
    <div>
      <MdDelete
        className="w-5 h-5 text-rose-600 cursor-pointer"
        onClick={() => setOpen(true)}
      />
      <ConfirmDelete
        open={open}
        title={title}
        loading={loading}
        onConfirm={onConfirm}
        onDecline={onDecline}
      />
    </div>
  );
};

export default Delete;
