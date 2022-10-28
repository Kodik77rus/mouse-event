import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import logo from "./logo.svg";
import "./App.css";

const webSocket = io("http://localhost:8080");

function App() {
  const [connected, setConnected] = useState(webSocket.connected);
  const [coords, setCoords] = useState({ screenX: 0, screenY: 0 });

  useEffect(() => {
    connect();
    handleMouseEvents();
  });

  const handleMouseEvents = () => {
    const handleWindowMouseMove = (event: MouseEvent) => {
      const { screenX, screenY } = event;
      setCoords({
        screenX,
        screenY,
      });
      webSocket.emit("mouseEvent", JSON.stringify(coords));
    };
    window.addEventListener("mousemove", handleWindowMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
    };
  };

  const connect = () => {
    webSocket.on("connect", () => {
      setConnected(true);
    });
    webSocket.on("close", () => {
      setConnected(false);
      console.log("socker close");
    });
    webSocket.on("error", () => {
      console.error("socker err");
    });
  };

  return !connected ? (
    <div></div>
  ) : (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
