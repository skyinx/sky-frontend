import columns from "@/columns/group";
import AddLabel from "@/components/AddLabel";
import useGroup from "@/hooks/group/useGroup";
import Wrapper from "@/layout/Wrapper";
import Button from "@/widgets/Button";
import Table from "@/widgets/Table";
import React from "react";

function Group() {
  const props = useGroup();
  const { handlePrintAll } = props;

  return (
    <Wrapper
      title="Group"
      headerDetails={
        <Button className="w-full" onClick={handlePrintAll}>
          Print All
        </Button>
      }
    >
      <Table columns={columns(props)} {...props} />
      <AddLabel editData={false} {...props} />
    </Wrapper>
  );
}

export default Group;
