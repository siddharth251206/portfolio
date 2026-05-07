import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import ProjectDetail from "./pages/ProjectDetail";
import { useEffect } from "react";
import CustomCursor from "./components/CustomCursor";

function App() {
  return (
    <>
      <BrowserRouter>
        <CustomCursor />
        <Routes>
          <Route index element={<Home />}/>
          <Route path="admin" element={<Admin />}/>
          <Route path="project/:id" element={<ProjectDetail />}/>
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
