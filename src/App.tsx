import "./App.css";
import useURLDetails from "./hooks/useURLDetails";

function App() {
  const details = useURLDetails(["id","name"]);

  console.log("URL INFO", details);

  return (
    <div className="App">
      <div>href: {details.href}</div>
      <div>hash: {details.hash}</div>
      <div>
        params:{" "}
        {details.params.map((item) => {
          return (
            <div key={item.key} style={{ marginLeft: "50px" }}>
              {item.key}: {item.value}
            </div>
          );
        })}
      </div>
      <div>hostname: {details.hostname}</div>
      <div>port: {details.port}</div>
      <div>pathname: {details.pathname}</div>
      <div>protocol: {details.protocol}</div>
      <div>
        <button onClick={() => details.set("/home")}>Go to Home</button>
      </div>
    </div>
  );
}

export default App;
