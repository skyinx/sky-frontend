import Button from "@/widgets/Button";
import Dropdown from "@/widgets/Dropdown";
import Input from "@/widgets/Input";
import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";

function AddSubItem(props) {
  const {
    name,
    setValue,
    watch,
    register,
    handleAdd,
    handleRemove,
    getValues,
  } = props;

  const items = getValues(`${name}s`) || [];

  return (
    <div>
      <label
        htmlFor={name}
        className="inline-block text-xs font-medium capitalize text-black"
      >
        {name}
      </label>
      <div className="flex items-center gap-2">
        <Dropdown
          module={name}
          className="w-full"
          value={watch(name)}
          filter={watch(`${name}s`)}
          rest={register(name)}
          placeholder={`Select ${name}`}
          onChange={(opt) => setValue(name, opt)}
        />
        <Input
          type="number"
          placeholder={`Enter ${name}`}
          rest={register(`${name}Per`)}
          className="placeholder:capitalize"
        />
        <Button
          outline
          onClick={() => handleAdd(name)}
          className="!h-[42px] rounded-xl"
        >
          Add
        </Button>
      </div>
      {items.length > 0 ? (
        <div className="my-2 flex flex-col items-center justify-start rounded-xl border border-gray-300">
          {items.map((props, index) => {
            const { label, percentage } = props;
            return (
              <div
                key={index}
                className="group flex w-full items-center justify-between border-b border-gray-300 px-2 py-1 text-xs font-semibold text-primary last:border-0"
              >
                <div className="px-1 py-1.5">
                  {label} = {percentage}
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span
                    className="cursor-pointer rounded-md border-primary bg-primary bg-opacity-10 p-1 hover:border"
                    onClick={() => {
                      handleRemove(index, name);
                      setValue(name, props);
                      setValue(`${name}Per`, percentage);
                    }}
                  >
                    <MdEdit className="h-4 w-4" />
                  </span>
                  <span
                    className="cursor-pointer rounded-md border-primary bg-primary bg-opacity-10  p-1 hover:border"
                    onClick={() => {
                      handleRemove(index, name);
                    }}
                  >
                    <MdDelete className="h-4 w-4" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default AddSubItem;
