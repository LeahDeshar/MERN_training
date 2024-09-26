import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./app/features/counter/counterSlice";
import AllProducts from "./app/AllProducts";
import AddNewProduct from "./app/features/AddNewProduct";

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      <h1>{count} Steps</h1>

      <div>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
      </div>
      <AllProducts />
      <AddNewProduct />
    </>
  );
}

export default App;
