import WaterColumns from "@/columns/water";
import AddWater from "@/components/ink/AddWater";
import Wrapper from "@/layout/Wrapper";
import clientPromise from "@/lib/mongodb";
import Button from "@/widgets/Button";
import Input from "@/widgets/Input";
import Table from "@/widgets/Table";
import { useState } from "react";

export const getServerSideProps = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("ink");
    const data = await db
      .collection("water_based")
      .find({})
      .limit(20)
      .toArray();
    return {
      props: { data: JSON.parse(JSON.stringify(data)) },
    };
  } catch (e) {
    console.error(e);
    return { props: { data: [] } };
  }
};

export default function Home({ data }) {
  console.log("props: ", data);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const handleCreate = async () => {
    await fetch("api/ink/water/create", {
      method: "POST",
      body: JSON.stringify({
        color: "White Paste",
        total: "100",
        material: [
          { TIO2: 60 },
          { "W&D-193": 2 },
          { DEFORMER: 0.2 },
          { "HPD-96": 27.8 },
          { WATER: 10 },
        ],
      }),
    });
  };

  
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
        getData={() => {}}
        data={data}
        onPaginationChange={() => {}}
        pageLimit={20}
        setPageLimit={() => {}}
      />
      <AddWater editData={false} setOpen={setOpen} open={open} />
    </Wrapper>
  );
}
