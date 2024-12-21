import { post } from "@/api";
import { LIMIT } from "@/constants/common";
import { getQuery } from "@/utils/helper";
import moment from "moment";
import { useEffect, useState } from "react";

const SEARCH = ["name"];

function useGroup() {
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
        module: "label",
        action: "list",
        data: {
          query: {
            ...getQuery(SEARCH, search),
            $and: [{ isActive: false, group: { $exists: false } }],
          },
          options: {
            populate: ["ink"],
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
      console.error("Get Group: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrintAll = async () => {
    try {
      setLoading(true);
      const name = `Group.${moment().format("DD.MM.YYYY ( hh.mm A )")}`;
      const response = await post({
        module: "group",
        action: "printAll",
        data: {},
        config: { responseType: "blob" },
      });
      if (response) {
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(response);
        link.download = `${name}.pdf`;
        link.click();
      }
    } catch (error) {
      console.error("Print Group: ", error);
    } finally {
      setLoading(false);
      getData();
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
    handlePrintAll,
  };
}

export default useGroup;
