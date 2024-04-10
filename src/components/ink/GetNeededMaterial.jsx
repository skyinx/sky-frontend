import DrawerWrapper from "@/shared/Drawer";
import Button from "@/widgets/Button";
import React, { useState } from "react";
import { AiFillCalculator } from "react-icons/ai";
import Input from "@/widgets/Input";
import { Resolution, usePDF } from "react-to-pdf";

function GetNeededMaterial({ data }) {
  const [open, setOpen] = useState(false);
  const [need, setNeed] = useState(0);

  const getCalculation = ({ total, current }) => {
    return Number(parseFloat((need * current) / total).toFixed(2));
  };

  const { toPDF, targetRef } = usePDF({
    filename: "new.pdf",
    canvas: {
      mimeType: "image/png",
      qualityRatio: 1,
    },
    page: {
      margin: 10,
      format: "A4",
      orientation: "portrait",
    },
    resolution: Resolution.NORMAL,
  });

  return (
    <div>
      <AiFillCalculator
        onClick={() => setOpen(true)}
        className="w-5 h-5 text-primary cursor-pointer"
      />
      <DrawerWrapper
        title="Needed Materials"
        modalFooter={
          <>
            <Button onClick={toPDF}>Export</Button>
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
          <div
            ref={targetRef}
            className="border border-primary rounded-xl p-2 flex flex-col gap-2"
          >
            <p className="font-bold border border-primary text-primary bg-primary bg-opacity-10 rounded-xl p-3">
              {data?.name}
            </p>
            <div className="font-bold border border-primary rounded-xl h-12 px-2.5 flex items-center gap-2">
              <p className="text-sm text-black">
                {data?.pigment?.data?.name} :{" "}
              </p>
              <p>
                {getCalculation({
                  total: data?.percentage,
                  current: data?.pigment?.percentage,
                })}
              </p>
            </div>
            {data?.products?.map((item, key) => {
              return (
                <div
                  key={key}
                  className="font-bold border border-primary rounded-xl h-12 px-2.5 flex items-center gap-2"
                >
                  <p className="text-sm text-black">{item?.product?.name} : </p>
                  <p>
                    {getCalculation({
                      total: data?.percentage,
                      current: item?.percentage,
                    })}
                  </p>
                </div>
              );
            })}
            <p className="font-bold border border-primary text-primary bg-primary bg-opacity-10 rounded-xl h-12  px-2.5 flex items-center">
              Total : {need}
            </p>
          </div>
        </div>
      </DrawerWrapper>
    </div>
  );
}

export default GetNeededMaterial;
