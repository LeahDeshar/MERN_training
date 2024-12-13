import React, { useEffect, useMemo, useState } from "react";
import { Product } from "../types/types";
function Filter() {
  const [data, setData] = useState<Product[] | null>(null);
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

  const filteredData = useMemo(() => {
    return data?.filter((item) => item.price < 100);
  }, [data]);

  const categories = useMemo(() => {
    return data
      ?.map((item) => item.category)
      .filter((value, index, self) => self.indexOf(value) === index);
  }, [data]);
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h2>Filter</h2>
      <div>
        <h3>Categories</h3>
        <ul className="horizontal-ul">
          {categories?.map((category) => (
            <li key={category}>{category}</li>
          ))}
        </ul>
      </div>
      <ul>
        {filteredData?.map((item) => (
          <li key={item.product_id}>
            <div className="container">
              <p>{item.product_name}</p>
              <p>{item.price}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Filter;
