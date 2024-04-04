import WaterColumns from "@/columns/water";
import AddWater from "@/components/ink/AddWater";
import { LIMIT } from "@/constants/common";
import Wrapper from "@/layout/Wrapper";
import Button from "@/widgets/Button";
import Input from "@/widgets/Input";
import Table from "@/widgets/Table";
import getConfig from "next/config";
import { useEffect, useState } from "react";

const { publicRuntimeConfig } = getConfig();

export const getServerSideProps = async () => {
  try {
    const water = await fetch(
      `${publicRuntimeConfig.PUBLIC_NEXT_BASE_URL}/api/ink/water/list`,
      {
        method: "POST",
      }
    ).then((res) => res.json());
    return {
      props: { water: JSON.stringify(water) },
    };
  } catch (e) {
    console.error(e);
    return { props: { water: "{}" } };
  }
};

export default function Home({ water = "{}" }) {
  const { data = [], paginator = {} } = JSON.parse(water);
  console.log("data: ", data);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [limit, setLimit] = useState(LIMIT);

  const getData = async (page) => {
    console.log("page: ", page);
    await fetch(`/api/ink/water/list`, {
      method: "POST",
      body: JSON.stringify({
        options: {
          populate: ["materials.material"],
        },
      }),
    }).then((res) => res.json());
  };

  useEffect(() => {
    handleGet();
  }, []);

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
        {...paginator}
      />
      <AddWater editData={false} setOpen={setOpen} open={open} />
    </Wrapper>
  );
}
