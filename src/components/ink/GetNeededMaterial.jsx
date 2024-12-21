import DrawerWrapper from "@/shared/Drawer";
import Button from "@/widgets/Button";
import React, { useEffect, useState } from "react";
import { AiFillCalculator } from "react-icons/ai";
import Input from "@/widgets/Input";
import useLabel from "@/hooks/label/useLabel";

function GetNeededMaterial({ data }) {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState();
  const [need, setNeed] = useState(0);

  const { loading, printLabel, addToGroup } = useLabel({ setOpen });

  const getData = (need) => {
    const obj = { price: 0, percentage: 0, products: [], pigments: [] };
    Object.entries(data).forEach(([key, value]) => {
      if (key === "products" || key === "pigments") {
        const arr = [];
        value.forEach((i) => {
          const percentage = Number(
            parseFloat((need * i.percentage) / data.percentage).toFixed(2),
          );
          const price = Number(parseFloat(percentage * i?.price).toFixed(2));
          obj.price = Number(parseFloat(obj.price + price).toFixed(2));
          obj.percentage = Number(
            parseFloat(obj.percentage + percentage).toFixed(2),
          );
          arr.push({ name: i[key.replace(/s$/, "")]?.name, price, percentage });
        });
        obj[key] = arr;
      }
    });
    setList(obj);
    return { ...obj };
  };

  useEffect(() => {
    getData(need);
  }, [need]);

  useEffect(() => {
    if (!open) {
      setNeed(0);
    }
  }, [open]);

  return (
    <div>
      <AiFillCalculator
        onClick={() => setOpen(true)}
        className="h-5 w-5 cursor-pointer text-primary"
      />
      <DrawerWrapper
        title="Needed Materials"
        modalFooter={
          <>
            <Button
              loading={loading === "group"}
              disabled={!!loading}
              onClick={() => {
                addToGroup({ ink: data?._id, percentage: need });
              }}
            >
              Add To Group
            </Button>
            <Button
              loading={loading === "print"}
              disabled={!!loading}
              onClick={() => {
                printLabel({
                  ink: data?._id,
                  percentage: need,
                  name: data?.name,
                });
              }}
            >
              Print Label
            </Button>
            <Button outline onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </>
        }
        open={open}
        setOpen={setOpen}
      >
        <div className="space-y-4">
          <Input
            type="number"
            value={need}
            placeholder="Enter Need"
            onChange={(e) => setNeed(e.target.value)}
          />
          <main className="space-y-4">
            <h1 className="text-md flex min-h-12 items-center justify-start rounded-xl border border-red-600 bg-red-600 bg-opacity-10 px-4 py-2 font-bold text-red-600">
              {data?.name}
            </h1>
            <div className="flow-root rounded-xl border border-primary">
              <table className="min-w-full">
                <tbody className="[&>tr>th]:!font-extrabold">
                  {list?.pigments?.length > 0 && (
                    <>
                      <tr className="h-12 border-b border-primary text-black">
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-sm font-semibold"
                        >
                          Pigment
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-right text-sm font-semibold"
                        >
                          Percentage
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-right text-sm font-semibold"
                        >
                          Price
                        </th>
                      </tr>
                      {list?.pigments?.map(
                        ({ name, price, percentage }, key) => {
                          return (
                            <tr key={key} className="border-b border-gray-200">
                              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                {name}
                              </td>
                              <td className="px-4 py-3 text-right text-sm text-gray-500">
                                {percentage}
                              </td>
                              <td className="px-4 py-3 text-right text-sm text-gray-500">
                                {price}
                              </td>
                            </tr>
                          );
                        },
                      )}

                      <tr className="h-0 border-b border-primary" />
                    </>
                  )}

                  {list?.products?.length > 0 && (
                    <>
                      <tr className="h-12 border-b border-primary text-black">
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-sm font-semibold"
                        >
                          Product
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-right text-sm font-semibold"
                        >
                          Percentage
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-right text-sm font-semibold"
                        >
                          Price
                        </th>
                      </tr>
                      {list?.products?.map(
                        ({ name, price, percentage }, key) => {
                          return (
                            <tr key={key} className="border-b border-gray-200">
                              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                                {name}
                              </td>
                              <td className="px-4 py-3 text-right text-sm text-gray-500">
                                {percentage}
                              </td>
                              <td className="px-4 py-3 text-right text-sm text-gray-500">
                                {price}
                              </td>
                            </tr>
                          );
                        },
                      )}
                      <tr className="h-0 border-b border-primary"></tr>
                    </>
                  )}

                  <tr className="h-12">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-black">
                      Total
                    </th>
                    <th className="px-4 py-3  text-right text-sm font-semibold text-black">
                      {list?.percentage}
                    </th>
                    <th className="px-4 py-3  text-right text-sm font-semibold text-black">
                      {list?.price}
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </main>
        </div>
      </DrawerWrapper>
    </div>
  );
}

export default GetNeededMaterial;
