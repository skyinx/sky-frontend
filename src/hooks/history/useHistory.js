import { post } from "@/api";
import { LIMIT } from "@/constants/common";
import { getQuery } from "@/utils/helper";
import { useEffect, useState } from "react";

const SEARCH = ["name"];

function useHistory() {
  const [data, setData] = useState([]);
  const [paginator, setPaginator] = useState([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLimit, setPageLimit] = useState(LIMIT);

  const getData = async (page = 1) => {
    try {
      setLoading(true);
      await post({
        module: "history",
        action: "list",
        data: {
          query: {},
          options: {
            populate: [
              "group",
              {
                path: "label",
                model: "Label",
                populate: { path: "ink", model: "Ink" },
              },
            ],
            page,
            limit: pageLimit,
          },
        },
      }).then(({ data: response = {} }) => {
        const { data = [], paginator = {} } = response || {};
        setData(data);
        setPaginator(paginator);
      });
    } catch (error) {
      console.error("Get History: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = async (data = {}) => {
    const name = data?.type === "label" ? data?.label?.name : data?.group?.name;
    const response = await post({
      module: "history",
      action: "print",
      data: {
        type: data?.type,
        id: data?.type === "label" ? data?.label?._id : data?.group?._id,
      },
      config: { responseType: "blob" },
    });

    if (response) {
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(response);
      link.download = `${name}.pdf`;
      link.click();
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
    handlePrint,
  };
}

export default useHistory;
