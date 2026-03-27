import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageWrapper from "./components/PageWrapper";

const Home = React.lazy(() => import("./pages/Home"));
const Blog = React.lazy(() => import("./pages/Blog"));
const BlogPost = React.lazy(() => import("./pages/BlogPost"));
const TastingSeries = React.lazy(() => import("./pages/TastingSeries"));
const Sunroom = React.lazy(() => import("./pages/Sunroom"));
const Wheel = React.lazy(() => import("./pages/Wheel"));
const OtherProjects = React.lazy(() => import("./pages/OtherProjects"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <BrowserRouter>
      <PageWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />*/}
          <Route path="/tasting" element={<TastingSeries />} />
          <Route path="/sunroom" element={<Sunroom />} />
          <Route path="/wheel" element={<Wheel />} />
          <Route path="/other-projects" element={<OtherProjects />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageWrapper>
    </BrowserRouter>
  );
}

export default App;
