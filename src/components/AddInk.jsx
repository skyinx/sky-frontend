/* eslint-disable react-hooks/exhaustive-deps */
import { post } from "@/api";
import DrawerWrapper from "@/shared/Drawer";
import Button from "@/widgets/Button";
import Input from "@/widgets/Input";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { inkSchema } from "@/schema/ink";
import Dropdown from "@/widgets/Dropdown";
// import { Switch } from "@headlessui/react";
import { MdDelete, MdEdit } from "react-icons/md";
import { Switch } from "@/widgets/Switch";

const defaultValues = {
  name: undefined,
  price: undefined,
  parent: undefined,
  product: undefined,
  percentage: 100,
  products: undefined,
  status: false,
};

const AddInk = ({
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
    watch,
    setValue,
    getValues,
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(inkSchema),
  });

  const handleClear = async () => {
    await getData();
    setOpen(false);
    setLoading(false);
    setTimeout(() => setEditData(null), 200);
  };

  const formatValue = (value) => {
    return Number(parseFloat(value ?? 0).toFixed(2));
  };

  const getPayload = (values) => {
    const obj = { price: 0, percentage: 0 };
    const products = values.products?.map((item) => {
      const price = formatValue(item?.price);
      const percentage = formatValue(item?.percentage);
      const totalPrice = formatValue(price * percentage);
      obj.price = formatValue(obj.price + totalPrice);
      obj.percentage = formatValue(obj.percentage + percentage);
      return {
        product: item?.value,
        price,
        percentage,
        totalPrice,
      };
    });
    const pigmentPrice = formatValue(values?.pigment?.price);
    const pigmentPer = formatValue(values?.pigment?.percentage);
    const pigment = {
      data: values?.pigment?.value,
      percentage: pigmentPer,
      price: pigmentPrice,
      totalPrice: formatValue(pigmentPrice * pigmentPer),
    };
    obj.price = formatValue(obj.price + pigment?.totalPrice);
    obj.percentage = formatValue(obj.percentage + pigmentPer);
    const payload = {
      name: values.name,
      pigment,
      products,
      price: formatValue(obj.price / 100),
      percentage: formatValue(obj.percentage),
    };
    return payload;
  };

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      const payload = getPayload(values);
      await post({
        module: "ink",
        action: values?._id ? "update" : "create",
        parameters: [values?._id],
        data: payload,
      });
    } catch (error) {
      console.error("Add Ink Error: ", error);
      setLoading(false);
    } finally {
      setLoading(false);
      handleClear();
    }
  };

  useEffect(() => {
    if (open) {
      if (editData) {
        reset({
          ...editData,
          pigment: {
            ...editData.pigment,
            label: editData.pigment?.data?.name,
            value: editData.pigment?.data?._id,
          },
          products: [
            ...(editData.products ?? [])?.map((item) => ({
              ...item,
              label: item?.product?.name,
              value: item?.product?._id,
            })),
          ],
        });
      } else {
        reset({ ...defaultValues });
      }
    }
  }, [editData, open]);

  const handleRemove = (index) => {
    const list = getValues("products")?.filter((_, idx) => idx !== index);
    setValue("products", list);
  };

  const handleAdd = () => {
    const product = getValues("product") || {};
    const productPer = parseFloat(getValues("productPer"));
    const products = [
      ...(getValues("products") || []),
      {
        ...product,
        percentage: productPer,
      },
    ];
    setValue("products", products);
    setValue("product", null);
    setValue("productPer", undefined);
  };

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
        <div>
          <label
            htmlFor="product"
            className="text-xs font-medium inline-block text-black"
          >
            Pigment
          </label>
          <div className="flex gap-2 items-center">
            <Dropdown
              module="pigment"
              className="w-full"
              value={watch("pigment")}
              rest={register("pigment")}
              placeholder="Select Pigment"
              onChange={(opt) => setValue("pigment", opt)}
            />
            <Input
              type="number"
              placeholder="Enter Percentage"
              rest={register("pigment.percentage")}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="product"
            className="text-xs font-medium inline-block text-black"
          >
            Product
          </label>
          <div className="flex gap-2 items-center">
            <Dropdown
              module="product"
              className="w-full"
              value={watch("product")}
              filter={watch("products")}
              rest={register("products")}
              placeholder="Select Product"
              onChange={(opt) => setValue("product", opt)}
            />
            <Input
              type="number"
              placeholder="Enter Percentage"
              rest={register("productPer")}
            />
            <Button
              outline
              onClick={handleAdd}
              className="!h-[42px] rounded-xl"
            >
              Add
            </Button>
          </div>
          <div className="my-2 flex flex-col border border-gray-300 rounded-xl items-center justify-start">
            {(getValues("products") || []).map((props, index) => {
              const { label, percentage } = props;
              return (
                <div
                  key={index}
                  className="w-full text-xs group px-2 py-1 font-semibold text-primary border-b last:border-0 border-gray-300 flex items-center justify-between"
                >
                  <div className="px-1 py-1.5">
                    {label} = {percentage}
                  </div>
                  <div className="flex justify-center items-center gap-2">
                    <span
                      className="cursor-pointer bg-primary hover:border bg-opacity-10 border-primary rounded-md p-1"
                      onClick={() => {
                        handleRemove(index);
                        setValue("product", props);
                        setValue("productPer", percentage);
                      }}
                    >
                      <MdEdit className="w-4 h-4" />
                    </span>
                    <span
                      className="cursor-pointer bg-primary hover:border bg-opacity-10 border-primary  rounded-md p-1"
                      onClick={() => {
                        handleRemove(index);
                      }}
                    >
                      <MdDelete className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DrawerWrapper>
  );
};

export default AddInk;
