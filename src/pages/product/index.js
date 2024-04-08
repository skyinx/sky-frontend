import columns from "@/columns/product";
import AddProduct from "@/components/AddProduct";
import useProduct from "@/hooks/product/useProduct";
import Wrapper from "@/layout/Wrapper";
import Button from "@/widgets/Button";
import { Search } from "@/widgets/Search";
import Table from "@/widgets/Table";
import React from "react";

function Product() {
  const props = useProduct();

  return (
    <Wrapper
      title="Products"
      headerDetails={
        <div className="flex items-center w-full gap-2">
          <Search title="Product" {...props} />
          <Button
            className="w-full"
            onClick={() => {
              props.setOpen(true);
            }}
          >
            Add Product
          </Button>
        </div>
      }
    >
      <Table columns={columns(props)} {...props} />
      <AddProduct editData={false} {...props} />
    </Wrapper>
  );
}

export default Product;
