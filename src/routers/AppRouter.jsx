import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "../context/Appcontext";
import Activities from "../pages/Activities";
import ActivityDetail from "../pages/ActivityDetail";
import Filter from "../pages/Filter";
import Stats from "../pages/Stats";

function AppRouter() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/activities" element={<Activities />} />
          <Route path="/activities/:id" element={<ActivityDetail />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/" element={<Activities />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default AppRouter;
