import "./App.css";
import HeaderMenuPage from "./headerMenu";
import MainPage from "./main";
import "antd/dist/antd.css";

function App() {
  return (
    <div className="App">
      <HeaderMenuPage />
      <MainPage />
      <div id="footer">
        <h1>바닥영역</h1>
      </div>
    </div>
  );
}

export default App;
