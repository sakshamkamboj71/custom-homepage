import axios from "axios";
import { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import AddLink from "./pages/AddLink";
import All from "./pages/All";
import Bookmarks from "./pages/Bookmarks";
import Loading from "./pages/Loading";
import Login from "./pages/Login";
import Misc from "./pages/Misc";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Register";
import Social from "./pages/Social";
import Study from "./pages/Study";

function App() {
  const token = window.localStorage.getItem("token");
  const [valid, setValid] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchValidity = async () => {
      const response = await axios.post(
        "http://localhost:8000/user-auth/validity",
        {
          token,
        }
      );

      setValid(response.data.validity);
    };
    fetchValidity();
  }, []);

  useEffect(() => {
    const fetchLinks = async () => {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/link-handeler/get-links",
        {
          token,
        }
      );
      setLoading(false);

      if (response.data.error) {
        window.localStorage.removeItem("token");
        // window.location.reload();
      }

      setLinks(response.data.links);
      // window.location.reload();
    };

    if (valid) {
      fetchLinks();
    }
  }, [valid]);

  const [links, setLinks] = useState([]);

  const socialLinks = links.filter((obj) => obj.linkType === "Social");
  const studyLinks = links.filter((obj) => obj.linkType === "Study");
  const miscLinks = links.filter((obj) => obj.linkType === "Misc");
  const bookmarkLinks = links.filter((obj) => obj.linkType === "Bookmarks");

  if (loading) return <Loading />;

  return (
    <div className="App">
      <Router>
        <Routes>
          {valid ? (
            <>
              <Route path="/" element={<MainPage />}>
                <Route path="/" element={<All links={links} />} />
                <Route
                  path="/study"
                  element={<Study studyLinks={studyLinks} />}
                />
                <Route
                  path="/social"
                  element={<Social socialLinks={socialLinks} />}
                />
                <Route path="/misc" element={<Misc miscLinks={miscLinks} />} />
                <Route
                  path="/bookmarks"
                  element={<Bookmarks bookmarkLinks={bookmarkLinks} />}
                />
              </Route>
              <Route path="/add-link" element={<AddLink />} />
              <Route path="*" element={<PageNotFound />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<PageNotFound />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
