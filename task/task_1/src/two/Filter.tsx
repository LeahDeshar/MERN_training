import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Product } from "../types/types";
const initialProducts: Product[] = [
  {
    product_id: 1,
    product_name: "Wireless Headphones",
    price: 99.99,
    quantity_in_stock: 50,
    category: "Electronics",
    brand: "TechBrand",
    description: "High-quality wireless headphones.",
    release_date: "2023-01-15",
    average_rating: 4.5,
    shipping_cost: 5.99,
  },
  {
    product_id: 2,
    product_name: "Smartwatch",
    price: 149.99,
    quantity_in_stock: 30,
    category: "Wearables",
    brand: "TimeTech",
    description: "Smartwatch with fitness tracking.",
    release_date: "2023-05-10",
    average_rating: 4.2,
    shipping_cost: 4.99,
  },
];
function Filter() {
  const [data, setData] = useState<Product[] | null>(null);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(
    null
  );
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch("/MOCK_DATA.json");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setData(jsonData);
      };
      fetchData();
    } catch (error) {
      console.error("Error fetching JSON data:", error);
    }
  }, []);

  // const filteredData = useMemo(() => {
  //   return data?.filter((item) => item.price < 100);
  // }, [data]);

  const categories = useMemo(() => {
    return data
      ?.map((item) => item.category)
      .filter((value, index, self) => self.indexOf(value) === index);
  }, [data]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };
  const handlePriceRangeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedPriceRange(event.target.value);
  };
  const filteredCategoryData = useMemo(() => {
    if (!selectedCategory || !data) return data;

    let filtered = data;

    if (selectedCategory) {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    if (selectedPriceRange) {
      const [min, max] = selectedPriceRange.split("-").map(Number);
      filtered = filtered.filter(
        (item) => item.price >= min && item.price <= max
      );
    }

    return filtered;

    // return data.filter((item) => item.category === selectedCategory);
  }, [selectedCategory, data, selectedPriceRange]);

  const removeProduct = useCallback((id: number) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.product_id !== id)
    );
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h2>Filter useMemo simulation</h2>
      <div>
        <h3>Categories</h3>
        <ul className="horizontal-ul">
          {categories?.map((category) => (
            <li
              className={category === selectedCategory ? "active-category" : ""}
              key={category}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </li>
          ))}
        </ul>

        <div>
          <label htmlFor="priceRange" className="mx-1">
            Select Price Range:
          </label>
          <select id="priceRange" onChange={handlePriceRangeChange}>
            <option value="">All</option>
            <option value="0-50">0 - 50</option>
            <option value="51-100">51 - 100</option>
            <option value="101-200">101 - 200</option>
            <option value="201-500">201 - 500</option>
            <option value="501-1000">501 - 1000</option>
          </select>
        </div>
      </div>
      {products.map((product) => (
        <ProductCard
          key={product.product_id}
          product={product}
          onRemove={removeProduct}
        />
      ))}
      <ul>
        {filteredCategoryData?.map((item) => (
          <li key={item.product_id}>
            {/* <ListItem item={item} /> */}
            <div className="container">
              <p>{item.product_name}</p>
              <p>{item.price}$</p>
              <p className="bg-rounded">{item.brand}</p>
            </div>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Filter;

const ProductCard = memo(
  ({
    product,
    onRemove,
  }: {
    product: Product;
    onRemove: (id: number) => void;
  }) => {
    console.log(`Rendering ProductCard for: ${product.product_name}`);
    return (
      <div
        style={{
          border: "1px solid #ccc",
          padding: "16px",
          marginBottom: "8px",
        }}
      >
        <h3>{product.product_name}</h3>
        <p>Price: ${product.price}</p>
        <p>Category: {product.category}</p>
        <p>Brand: {product.brand}</p>
        <button onClick={() => onRemove(product.product_id)}>
          Remove Product
        </button>
      </div>
    );
  }
);
