/* eslint-disable react-hooks/exhaustive-deps */
import DrawerWrapper from "@/shared/Drawer";
import Button from "@/widgets/Button";
import Input from "@/widgets/Input";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdEdit } from "react-icons/md";

const defaultValues = {
  name: undefined,
  price: undefined,
};

const AddMaterial = ({
  open = false,
  loading = false,
  editData = null,
  getData = () => {},
  setOpen = () => {},
  setLoading = () => {},
  setEditData = () => {},
}) => {
  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues,
    mode: "onChange",
  });

  const handleClear = async () => {
    await getData();
    setOpen(false);
    setLoading(false);
    setEditData(null);
  };

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      await fetch("api/ink/material/create", {
        method: "POST",
        body: JSON.stringify({
          ...values,
        }),
      });
    } catch (error) {
      console.error("Add Material Error: ", error);
      setLoading(false);
    } finally {
      setLoading(false);
      handleClear();
    }
  };

  useEffect(() => {
    if (open) {
      if (editData) {
        reset({ ...editData });
      } else {
        reset({ ...defaultValues });
      }
    }
  }, [editData, open]);

  return (
    <DrawerWrapper
      title={editData ? "Update Material" : "Add Material"}
      modalFooter={
        <>
          <Button outline onClick={handleClear}>
            Cancel
          </Button>
          <Button
            loading={loading}
            className="border-primary border"
            onClick={handleSubmit(onSubmit)}
          >
            {editData ? "Update" : "Save"}
          </Button>
        </>
      }
      open={open}
      setOpen={setOpen}
    >
      <div className="space-y-3">
        <Input
          label={"Name"}
          placeholder="Enter Name"
          rest={register("name")}
          error={errors.name?.message}
        />
        <Input
          type="number"
          label={"Price"}
          placeholder="Enter Price"
          rest={register("price")}
          error={errors.price?.message}
        />
      </div>
    </DrawerWrapper>
  );
};

export default AddMaterial;
