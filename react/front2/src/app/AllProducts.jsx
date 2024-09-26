import React from "react";
import {
  useGetAllProductsQuery,
  useGetProductQuery,
} from "./features/todo/dummyData";

function AllProducts() {
  //   const { data, isError, isLoading } = useGetAllProductsQuery();
  const { data, isError, isLoading } = useGetProductQuery(195);
  console.log(data);
  return (
    <div>
      <h1>Products</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Something went wrong</p>
      ) : (
        <div>
          <h2>
            {data?.name} {data?.id}
          </h2>
          <p>{data?.description}</p>
        </div>
      )}
      {/* {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong</p>}
      {data &&
        data.products?.map((product) => (
          <div key={product.id}>
            <h2>
              {product.name} {product.id}
            </h2>
            <p>{product.description}</p>
          </div>
        ))} */}
    </div>
  );
}

export default AllProducts;
