/* eslint-disable react-hooks/exhaustive-deps */
import { post } from "@/api";
import DrawerWrapper from "@/shared/Drawer";
import Button from "@/widgets/Button";
import Input from "@/widgets/Input";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { pigmentSchema } from "@/schema/pigment";

const defaultValues = {
  name: undefined,
  price: undefined,
};

const AddPigment = ({
  open = false,
  loading = false,
  editData = null,
  setOpen = () => {},
  setLoading = () => {},
  setEditData = () => {},
  getData = async () => {},
}) => {
  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(pigmentSchema),
  });

  const handleClear = async () => {
    await getData();
    setOpen(false);
    setLoading(false);
    setTimeout(() => setEditData(null), 200);
  };

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      await post({
        module: "pigment",
        action: values?._id ? "update" : "create",
        parameters: [values?._id],
        data: {
          ...values,
        },
      });
    } catch (error) {
      console.error("Add Pigment Error: ", error);
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
      title={editData ? "Update Pigment" : "Add Pigment"}
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

export default AddPigment;
