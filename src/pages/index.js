import WaterColumns from "@/columns/water";
import AddWater from "@/components/ink/AddWater";
import { LIMIT } from "@/constants/common";
import Wrapper from "@/layout/Wrapper";
import Button from "@/widgets/Button";
import Input from "@/widgets/Input";
import Table from "@/widgets/Table";
import { useEffect, useState } from "react";

export default function Water() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(LIMIT);
  const [water, setWater] = useState({});

  const { data = [], paginator = {} } = water;

  const getData = async (page) => {
    try {
      setLoading(true);

      await fetch(`/api/ink/water/list`, {
        method: "POST",
        body: JSON.stringify({
          query: {
            color: {
              $regex: search,
              $options: "i",
            },
          },
          options: {
            populate: ["materials.material"],
            page,
            limit,
          },
        }),
      })
        .then((res) => res.json())
        .then((res) => setWater(res));
    } catch (error) {
      console.error("Get Water Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [search, limit]);

  return (
    <Wrapper
      title="Water Based"
      headerDetails={
        <div className="flex items-center w-full gap-2">
          <Input
            clearable
            value={search}
            placeholder={"Search Water Based"}
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
            Add Color
          </Button>
        </div>
      }
    >
      <Table
        columns={
          WaterColumns({
            list: data,
          }).columns
        }
        data={data}
        getData={getData}
        pageLimit={limit}
        setPageLimit={setLimit}
        loading={loading}
        {...paginator}
      />
      <AddWater editData={false} setOpen={setOpen} open={open} />
    </Wrapper>
  );
}
