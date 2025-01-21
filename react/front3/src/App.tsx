import "./App.css";

function App() {
  return (
    <>
      <div>
        <h1>Hello</h1>
        <svg width="100" height="100">
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="black"
            stroke-width="3"
            fill="red"
          >
            <animate
              attributeName="r"
              from="10"
              to="40"
              dur="1s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>

        <svg width="100" height="100">
          <circle cx="50" cy="50" r="40" fill="red">
            <animate
              attributeName="fill"
              from="red"
              to="blue"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>
    </>
  );
}

export default App;
