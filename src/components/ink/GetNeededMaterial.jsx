// import DrawerWrapper from "@/shared/Drawer";
// import Button from "@/widgets/Button";
// import React from "react";
// import { GoProjectRoadmap } from "react-icons/go";

// function GetNeededMaterial() {
//   const [open, setOpen] = useState(false);
//   return (
//     <div>
//       <GoProjectRoadmap onClick={() => setOpen(true)} />
//       <DrawerWrapper
//         title="Needed Materials"
//         modalFooter={
//           <Button outline onClick={() => setOpen(false)}>
//             Cancel
//           </Button>
//         }
//         open={open}
//         setOpen={setOpen}
//       >
//         <div className="space-y-3">
//           <Input
//             label={"Color"}
//             placeholder="Enter Color"
//             rest={register("color")}
//             error={errors.color?.message}
//           />
//           <Input
//             label={"Total"}
//             placeholder="Enter Total (KG)"
//             rest={register("total")}
//             error={errors.total?.message}
//           />
//           <div className="space-y-1">
//             <label
//               htmlFor="product"
//               className="text-xs font-medium inline-block text-black"
//             >
//               Materials
//             </label>
//             <div className="flex gap-2 items-center">
//               <Dropdown
//                 value={watch("material")}
//                 placeholder="Select Material"
//                 loadOptions={loadOptions}
//                 defaultOptions={materials}
//                 className="w-full"
//                 filterOption={filterMaterial}
//                 onChange={(opt) => setValue("material", opt)}
//               />
//               <Input
//                 placeholder="Enter Percentage"
//                 rest={register("percentage")}
//               />
//               <Button
//                 outline
//                 onClick={() => {
//                   setValue("materials", [
//                     ...(getValues("materials") || []),
//                     {
//                       material: getValues("material"),
//                       percentage: getValues("percentage"),
//                     },
//                   ]);
//                   setValue("material", null);
//                   setValue("percentage", undefined);
//                 }}
//                 className="!h-[42px] rounded-xl"
//               >
//                 Add
//               </Button>
//             </div>
//           </div>
//           <ul className="flex-1 flex-wrap !text-xs">
//             {watch("materials")?.map((m = {}, index) => {
//               const { material, percentage } = m;
//               return (
//                 <li
//                   key={index}
//                   className="m-0.5 group bg-primary bg-opacity-10 rounded-lg px-1 font-semibold text-primary border border-primary inline-flex gap-0.5 items-center"
//                 >
//                   <span className="px-1 py-1.5">
//                     {material?.label} = {percentage}
//                   </span>
//                   <span
//                     className="cursor-pointer hidden transition-all opacity-0 group-hover:opacity-100 duration-1000 group-hover:block border border-primary rounded-md p-1"
//                     onClick={() => {
//                       setValue("material");
//                       setValue("percentage");
//                       setValue("materials");
//                     }}
//                   >
//                     <MdClose />
//                   </span>
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       </DrawerWrapper>
//     </div>
//   );
// }

// export default GetNeededMaterial;
