/* eslint-disable react-hooks/exhaustive-deps */
import DrawerWrapper from "@/shared/Drawer";
import Button from "@/widgets/Button";
import Input from "@/widgets/Input";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { post } from "@/api";
import { labelSchema } from "@/schema/label";

const defaultValues = {
  percentage: 0,
};

const AddLabel = ({
  open = false,
  loading = false,
  editData = null,
  setOpen = () => {},
  setLoading = () => {},
  setEditData = () => {},
  getData = async () => {},
}) => {
  const formProps = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(labelSchema),
  });

  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = formProps;

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
        module: "label",
        action: values?._id ? "update" : "create",
        parameters: [values?._id],
        data: { percentage: values.percentage },
      });
    } catch (error) {
      console.error("Add Label Error: ", error);
      setLoading(false);
    } finally {
      setLoading(false);
      handleClear();
    }
  };

  useEffect(() => {
    if (open) {
      reset(
        editData
          ? { ...editData, percentage: editData.percentage }
          : { ...defaultValues },
      );
    }
  }, [editData, open]);

  return (
    <DrawerWrapper
      title={editData ? "Update Ink" : "Add Ink"}
      modalFooter={
        <>
          <Button outline onClick={handleClear}>
            Cancel
          </Button>
          <Button
            loading={loading}
            className="border border-primary"
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
          type="number"
          label="Percentage"
          placeholder="Enter Percentage"
          rest={register("percentage")}
          error={errors.percentage?.message}
        />
      </div>
    </DrawerWrapper>
  );
};

export default AddLabel;
