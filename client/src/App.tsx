import React, { useState, useEffect, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const socket = useRef<WebSocket>();
  const [connected, setConnected] = useState(true);
  const [coords, setCoords] = useState({ screenX: 0, screenY: 0 });

  useEffect(() => {
    connect();
    handleMouseEvents();
  }, []);

  const handleMouseEvents = () => {
    const handleWindowMouseMove = (event: MouseEvent) => {
      const { screenX, screenY } = event;
      setCoords({
        screenX,
        screenY,
      });
      socket.current?.send(JSON.stringify(coords));
    };
    window.addEventListener("mousemove", handleWindowMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
    };
  };

  const connect = () => {
    socket.current = new WebSocket("ws://localhost:8080");

    socket.current.onopen = () => {
      setConnected(true);
    };
    socket.current.onclose = () => {
      setConnected(false);
      console.log("socker close");
    };
    socket.current.onerror = () => {
      console.error("socker err");
    };
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
