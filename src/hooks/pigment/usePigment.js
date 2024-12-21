import { post } from "@/api";
import { LIMIT } from "@/constants/common";
import { getQuery } from "@/utils/helper";
import { useEffect, useState } from "react";

const SEARCH = ["name"];

function usePigment() {
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
        module: "pigment",
        action: "list",
        data: {
          query: { ...getQuery(SEARCH, search) },
          options: { page, limit: pageLimit },
        },
      }).then(({ data: response = {} }) => {
        const { data = [], paginator = {} } = response || {};
        setData(data);
        setPaginator(paginator);
      });
    } catch (error) {
      console.error("Get Pigment: ", error);
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

export default usePigment;
