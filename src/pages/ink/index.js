import columns from "@/columns/ink";
import AddInk from "@/components/AddInk";
import useInk from "@/hooks/ink/useInk";
import Wrapper from "@/layout/Wrapper";
import Button from "@/widgets/Button";
import { Search } from "@/widgets/Search";
import Table from "@/widgets/Table";
import React from "react";

function Ink() {
  const props = useInk();

  return (
    <Wrapper
      title="Inks"
      headerDetails={
        <div className="flex items-center w-full gap-2">
          <Search title="Ink" {...props} />
          <Button
            className="w-full"
            onClick={() => {
              props.setOpen(true);
            }}
          >
            Add Ink
          </Button>
        </div>
      }
    >
      <Table columns={columns(props)} {...props} />
      <AddInk editData={false} {...props} />
    </Wrapper>
  );
}

export default Ink;
