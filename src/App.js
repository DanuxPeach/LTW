import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import {Kidtube , Login , List , Video , Register } from "./pages";
// import Kidtube from "./pages/MainPage/Kidtube";
// import Login from "./pages/Login/Login";
// import List from "./pages/Categories/List";
// import Video from "./pages/Stream/Stream";
// import Register from "./pages/Register/Register";
import { useEffect } from "react";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/login":
        title = "";
        metaDescription = "";
        break;
      case "/list":
        title = "";
        metaDescription = "";
        break;
      case "/video":
        title = "";
        metaDescription = "";
        break;
      case "/register":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Kidtube />} />
      <Route path="/login" element={<Login />} />
      <Route path="/list" element={<List />} />
      <Route path="/video" element={<Video />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
export default App;
