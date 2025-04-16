import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import CardsPage from "@/pages/cards.tsx";
import TablePage from "@/pages/table.tsx";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<CardsPage />} path="/cards" />
      <Route element={<TablePage />} path="/table" />
    </Routes>
  );
}

export default App;
