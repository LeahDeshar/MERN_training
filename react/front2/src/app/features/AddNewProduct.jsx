import React from "react";
import { useAddNewProductMutation } from "./todo/dummyData";

function AddNewProduct() {
  const [addNewProduct, { data, error, isLoading }] =
    useAddNewProductMutation();

  const handleAddBtn = async () => {
    try {
      const newProduct = {
        id: 1,
        name: "Product 1",
        description: "This is product 1",
      };

      await addNewProduct(newProduct);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <p>{data?.id}</p>
      <p>{data?.title}</p>
      <p>{data?.description}</p>

      <button onClick={handleAddBtn}>Add new products</button>
    </div>
  );
}

export default AddNewProduct;
