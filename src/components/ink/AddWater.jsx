import DrawerWrapper from "@/shared/Drawer";
import Button from "@/widgets/Button";
import Dropdown from "@/widgets/Dropdown";
import Input from "@/widgets/Input";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";

const defaultValues = {
  color: undefined,
  materials: [],
  material: undefined,
  percentage: undefined,
  total: "100",
};

const AddWater = ({
  open = false,
  setOpen = () => {},
  getData = () => {},
  loading = false,
  setLoading = () => {},
  editData = null,
  setEditData = () => {},
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

  const [materials, setMaterials] = useState([]);

  const handleClear = async () => {
    await getData();
    setOpen(false);
    setLoading(false);
    setEditData(null);
  };

  const onSubmit = async (values) => {
    console.log("values: ", values);
    try {
      setLoading(true);
      delete values?.material;
      delete values?.percentage;
      await fetch("api/ink/water/create", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          materials: values?.materials.map((m) => ({
            material: m.material.value,
            percentage: m.percentage,
          })),
        }),
      });
    } catch (error) {
      console.error("Add Water Error: ", error);
    } finally {
      handleClear();
      setLoading(false);
    }
  };

  //   useEffect(() => {
  //     if (editData) {
  //       reset({ ...editData });
  //     } else {
  //       reset({ ...defaultValues });
  //     }
  //   }, [editData]);

  const loadOptions = async (search = "", callback) => {
    const data = await fetch("/api/ink/material/list", {
      method: "POST",
      body: JSON.stringify({
        query: {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        options: {
          limit: 5,
        },
      }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        return data?.map((r) => ({
          label: r.name,
          value: r._id,
        }));
      });
    callback?.(data);
    setMaterials(data);
  };

  const filterMaterial = (opt) => {
    return !(getValues("materials") || []).find(({ material }) => {
      return material.value === opt.value;
    });
  };

  useEffect(() => {
    loadOptions();
  }, []);

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
        <Input
          label={"Total"}
          placeholder="Enter Total (KG)"
          rest={register("total")}
          error={errors.total?.message}
        />
        <div className="space-y-1">
          <label
            htmlFor="product"
            className="text-xs font-medium inline-block text-black"
          >
            Materials
          </label>
          <div className="flex gap-2 items-center">
            <Dropdown
              value={watch("material")}
              placeholder="Select Material"
              loadOptions={loadOptions}
              defaultOptions={materials}
              className="w-full"
              filterOption={filterMaterial}
              onChange={(opt) => setValue("material", opt)}
            />
            <Input
              placeholder="Enter Percentage"
              rest={register("percentage")}
            />
            <Button
              outline
              onClick={() => {
                setValue("materials", [
                  ...(getValues("materials") || []),
                  {
                    material: getValues("material"),
                    percentage: getValues("percentage"),
                  },
                ]);
                setValue("material", null);
                setValue("percentage", undefined);
              }}
              className="!h-[42px] rounded-xl"
            >
              Add
            </Button>
          </div>
        </div>
        <ul className="flex-1 flex-wrap !text-xs">
          {watch("materials")?.map((m = {}, index) => {
            const { material, percentage } = m;
            return (
              <li
                key={index}
                className="m-0.5 group bg-primary bg-opacity-10 rounded-lg px-1 font-semibold text-primary border border-primary inline-flex gap-0.5 items-center"
              >
                <span className="px-1 py-1.5">
                  {material?.label} = {percentage}
                </span>
                <span
                  className="cursor-pointer hidden transition-all opacity-0 group-hover:opacity-100 duration-1000 group-hover:block border border-primary rounded-md p-1"
                  onClick={() => {
                    setValue("material");
                    setValue("percentage");
                    setValue("materials");
                  }}
                >
                  <MdClose />
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
