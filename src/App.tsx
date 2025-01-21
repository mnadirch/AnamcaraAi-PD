import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./components/layout/layout";
import Blog from "./pages/blog/blog";
const Main = lazy(() => import("./pages/main/main"));
const StartUpPage = lazy(() => import("./components/startup/startup"));
const Home = lazy(() => import("./pages/home/home"));
const CommingSoon = lazy(() => import("./components/commingSoon/commingsoon"));
const ReachOut = lazy(() => import("./components/reachout/reachout"));
const PageNotFound = lazy(
  () => import("./components/pagenotfound/pagenotfound")
);
const OurSolution = lazy(() => import("./pages/ourSolutions/oursolution"));
const Features = lazy(() => import("./pages/features/features"));
const Resources = lazy(() => import("./pages/resources/resources"));
const About = lazy(() => import("./pages/about/about"));
import Loading from "./components/loading/loading";


function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense>
              <StartUpPage />
            </Suspense>
          }
        />
        <Route
          path="/main"
          element={
            <Suspense fallback={<Loading />}>
              <Main />
            </Suspense>
          }
        />
        <Route>
          <Route
            path="/home"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />

          <Route
            path="/ai-robotics"
            element={
              <Layout>
                <CommingSoon />
              </Layout>
            }
          />

          <Route
            path="/solutions"
            element={
              <Layout>
                <OurSolution />
              </Layout>
            }
          />
          <Route
            path="/features"
            element={
              <Layout>
                <Features />
              </Layout>
            }
          />
          <Route
            path="/about"
            element={
              <Layout>
                <About />
              </Layout>
            }
          />
          <Route
            path="/resources"
            element={
              <Layout>
                <Resources />
              </Layout>
            }
          />
          <Route
            path="/reachout"
            element={
              <Layout>
                <ReachOut />
              </Layout>
            }
          />
        </Route>

        <Route
          path="/resources/blog"
          element={
            <Layout>
              <Blog />             
               </Layout>
          }
        />

        <Route path="*" element={<PageNotFound />} />

      </Routes>

    </Router>
  );
}

export default App;
