import { post } from "@/api";
import { useState } from "react";
import { toast } from "react-toastify";

const useLabel = ({ setOpen = () => {} }) => {
  const [loading, setLoading] = useState("");

  const printLabel = async ({ ink, name = "", percentage }) => {
    try {
      setLoading("print");
      const response = await post({
        module: "label",
        action: "print",
        data: { ink, percentage },
        config: { responseType: "blob" },
      });

      if (response) {
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(response);
        link.download = `${name}.pdf`;
        link.click();
      }
    } catch (error) {
      console.error("Print Error: ", error);
    } finally {
      setLoading("");
      setOpen(false);
    }
  };

  const addToGroup = async ({ ink, percentage }) => {
    try {
      setLoading("group");
      await post({
        module: "label",
        action: "create",
        data: { ink, percentage, isActive: false },
      });
      toast.success("Added to group");
    } catch (error) {
      console.error("Print Error: ", error);
    } finally {
      setLoading("");
      setOpen(false);
    }
  };

  return { loading, printLabel, addToGroup };
};

export default useLabel;
