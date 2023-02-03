import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import AComp from "./AComp";
import BComp from "./BComp";
import Geo from "./Geo";

function App() {
  return (
    <div>
      <ul>
        <li>
          {" "}
          <Link to="/a" data-test="a-link">
            Navigate to A
          </Link>
        </li>
        <li>
          <Link to="/b" data-test="b-link">
            Navigate to B
          </Link>
        </li>
      </ul>
      <div data-test="content">
        <Routes>
          <Route path="/a" element={<AComp />} />
          <Route path="/b" element={<BComp />} />
          <Route path="/us/geo" element={<Geo />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
