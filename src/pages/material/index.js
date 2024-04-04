import MaterialColumns from "@/columns/material";
import AddMaterial from "@/components/ink/AddMaterial";
import { LIMIT } from "@/constants/common";
import Wrapper from "@/layout/Wrapper";
import Button from "@/widgets/Button";
import Input from "@/widgets/Input";
import Table from "@/widgets/Table";
import { useEffect, useState } from "react";

export default function MaterialPage() {
  const [material, setMaterial] = useState([]);
  const { data = [], paginator = {} } = material;

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(LIMIT);

  const getData = async (page) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/ink/material/list`, {
        method: "POST",
        body: JSON.stringify({
          query: {
            name: {
              $regex: search,
              $options: "i",
            },
          },
          options: {
            page,
            limit,
          },
        }),
      }).then((res) => res.json());
      setMaterial(res);
    } catch (error) {
      console.error("Get Material: ", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, [search, limit]);

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
        loading={loading}
        pageLimit={limit}
        setPageLimit={setLimit}
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
