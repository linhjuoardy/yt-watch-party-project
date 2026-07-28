import { BrowserRouter, Routes, Route } from "react-router-dom";

import Loading from "../pages/Loading";
import Home from "../pages/Home";
import CreateRoom from "../pages/CreateRoom";
import Room from "../pages/Room";
import NotFound from "../pages/NotFound";

export default function AppRouter() {
  return (
<BrowserRouter>
  <Routes>

    <Route path="/" element={<Home />} />

    <Route path="/create" element={<CreateRoom />} />

    <Route path="/loading" element={<Loading />} />

    <Route path="/room/:roomId" element={<Room />} />

    <Route path="*" element={<NotFound />} />

  </Routes>
</BrowserRouter>
  );
}