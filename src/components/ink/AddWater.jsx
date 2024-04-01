import DrawerWrapper from "@/shared/Drawer";
import Button from "@/widgets/Button";
import Input from "@/widgets/Input";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdEdit } from "react-icons/md";

const defaultValues = {
  color: undefined,
  material: [],
  name: undefined,
  value: undefined,
  total: "100",
};

const AddWater = ({
  open,
  setOpen,
  getData,
  loading,
  setLoading,
  editData,
  setEditData,
}) => {
  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    watch,
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
      console.log("values: ", values);
    } finally {
      handleClear();
    }
  };

  //   useEffect(() => {
  //     if (editData) {
  //       reset({ ...editData });
  //     } else {
  //       reset({ ...defaultValues });
  //     }
  //   }, [editData]);

  return (
    <DrawerWrapper
      title={editData ? "Update Order" : "Add Order"}
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
          label={"Color"}
          placeholder="Enter Color"
          rest={register("color")}
          error={errors.color?.message}
        />
        <div className="space-y-1">
          <label
            htmlFor="product"
            className="text-xs font-medium inline-block text-black"
          >
            Material
          </label>
          <div className="flex gap-2 items-center">
            <Input placeholder="Enter Color" rest={register("name")} />
            <Input placeholder="Enter Color" rest={register("value")} />
            <Button
              outline
              onClick={() => {
                setValue("material", [
                  ...getValues("material"),
                  { [getValues("name")]: getValues("value") },
                ]);
                setValue("name"), undefined;
                setValue("value"), undefined;
              }}
              className="!h-[42px] rounded-xl"
            >
              Add
            </Button>
          </div>
        </div>
        <ul className="space-x-2 space-y-1 !text-xs">
          {watch("material")?.map((m, index) => {
            const [[name, value]] = Object.entries(m);
            return (
              <li
                key={index}
                className="group bg-gray-100 rounded-full px-1 border border-gray-900 inline-flex gap-0.5 items-center"
              >
                <span className="px-1 py-1.5">
                  {name}: {value}
                </span>
                <span className="cursor-pointer hidden transition-all duration-300 group-hover:block group-hover:border group-hover:border-gray-900 rounded-full p-1">
                  <MdEdit />
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </DrawerWrapper>
  );
};

export default AddWater;
