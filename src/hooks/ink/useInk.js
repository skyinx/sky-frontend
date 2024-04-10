import { post } from "@/api";
import { LIMIT } from "@/constants/common";
import { getQuery } from "@/utils/helper";
import { useEffect, useState } from "react";

const SEARCH = ["name"];

function useInk() {
  const [data, setData] = useState([]);
  const [paginator, setPaginator] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLimit, setPageLimit] = useState(LIMIT);
  const [editData, setEditData] = useState();

  const getData = async (page = 1) => {
    try {
      setLoading(true);
      await post({
        module: "ink",
        action: "list",
        data: {
          query: { ...getQuery(SEARCH, search) },
          options: {
            populate: ["products.product", "pigment.data"],
            page,
            limit: pageLimit,
          },
        },
      }).then(({ data = [], paginator = {} }) => {
        setData(data);
        setPaginator(paginator);
      });
    } catch (error) {
      console.error("Get Ink: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [search, pageLimit]);

  return {
    open,
    data,
    pageLimit,
    loading,
    getData,
    setOpen,
    setPageLimit,
    setSearch,
    paginator,
    editData,
    setEditData,
  };
}

export default useInk;
