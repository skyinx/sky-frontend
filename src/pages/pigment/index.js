import columns from "@/columns/pigment";
import AddPigment from "@/components/AddPigment";
import usePigment from "@/hooks/pigment/usePigment";
import Wrapper from "@/layout/Wrapper";
import Button from "@/widgets/Button";
import { Search } from "@/widgets/Search";
import Table from "@/widgets/Table";
import React from "react";

function Pigment() {
  const props = usePigment();

  return (
    <Wrapper
      title="Pigments"
      headerDetails={
        <div className="flex items-center w-full gap-2">
          <Search title="Pigment" {...props} />
          <Button
            className="w-full"
            onClick={() => {
              props.setOpen(true);
            }}
          >
            Add Pigment
          </Button>
        </div>
      }
    >
      <Table columns={columns(props)} {...props} />
      <AddPigment editData={false} {...props} />
    </Wrapper>
  );
}

export default Pigment;
