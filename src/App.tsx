import { Fragment } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import listRoute from "./routes";

function App() {
  return (
    <Router>
      <Routes>
        {listRoute.map((item, index) => {
          const Page = item.component;
          const Layout = item.layout ?? Fragment;
          return (
            <Route
              key={index}
              path={item.path}
              element={<Layout>{Page}</Layout>}
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
