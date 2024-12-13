import React, { useEffect, useMemo, useState } from "react";
import { Product } from "../types/types";
function Filter() {
  const [data, setData] = useState<Product[] | null>(null);
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

  const filteredData = useMemo(() => {
    return data?.filter((item) => item.price < 100);
  }, [data]);

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
    return data.filter((item) => item.category === selectedCategory);
  }, [selectedCategory, data]);

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
          <label htmlFor="priceRange">Select Price Range: </label>
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
      <ul>
        {filteredCategoryData?.map((item) => (
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
