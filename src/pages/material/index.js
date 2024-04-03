import MaterialColumns from "@/columns/material";
import AddMaterial from "@/components/ink/AddMaterial";
import Wrapper from "@/layout/Wrapper";
import { Material } from "@/models/ink/Material";
import Button from "@/widgets/Button";
import Input from "@/widgets/Input";
import Table from "@/widgets/Table";
import { useRouter } from "next/router";
import { useState } from "react";

export default function MaterialPage() {
  const { data = [], paginator = {} } = JSON.parse("{}");

  const router = useRouter();
  
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const getData = () => {
    router.replace(router.asPath);
  };

  return (
    <Wrapper
      title="Materials"
      headerDetails={
        <div className="flex items-center w-full gap-2">
          <Input
            clearable
            value={search}
            placeholder={"Search Material"}
            className="!w-64 !rounded-lg"
            onClear={() => setSearch("")}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            className="w-full"
            onClick={() => {
              setOpen(true);
            }}
          >
            Add Material
          </Button>
        </div>
      }
    >
      <Table
        columns={
          MaterialColumns({
            list: data,
          }).columns
        }
        data={data}
        getData={getData}
        onPaginationChange={() => {}}
        pageLimit={20}
        setPageLimit={() => {}}
        {...paginator}
      />
      <AddMaterial
        editData={false}
        setOpen={setOpen}
        open={open}
        getData={getData}
        setLoading={setLoading}
      />
    </Wrapper>
  );
}
