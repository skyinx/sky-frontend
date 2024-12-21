import columns from "@/columns/history";
import useHistory from "@/hooks/history/useHistory";
import Wrapper from "@/layout/Wrapper";
import Table from "@/widgets/Table";
import React from "react";

function History() {
  const props = useHistory();

  return (
    <Wrapper title="History">
      <Table columns={columns(props)} {...props} />
    </Wrapper>
  );
}

export default History;
