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
        <a href="https://github.com/WoongL">
          <img id="gitlink" src="/github-icon.png" />
        </a>

        <p id="email">E-mail : woongl7690@gmail.com</p>
      </div>
    </div>
  );
}

export default App;
