import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import Modal from "@/shared/Modal";
import { del } from "@/api";

const Delete = ({
  id,
  module = "",
  getData = async () => {},
  title = "Are you sure ?",
  description = "This action cannot be undone. All values associated with this field will be lost.",
}) => {
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
        className="h-5 w-5 cursor-pointer text-rose-600"
        onClick={() => setOpen(true)}
      />
      <Modal
        open={open}
        title={title}
        setOpen={setOpen}
        loading={loading}
        onConfirm={onConfirm}
        onDecline={onDecline}
        description={description}
      />
    </div>
  );
};

export default Delete;
