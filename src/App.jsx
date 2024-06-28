import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import DiscoverPage from "./pages/DiscoverPage/DiscoverPage";
import EventsPage from "./pages/EventsPage/EventsPage";
import { useState } from "react";

function App() {
  const [postalCode, setPostalCode] = useState("");
  const [error, setError] = useState("");
  const [submittedPostalCode, setSubmittedPostalCode] = useState("");

  const postalCodeValidation = (postalCode) => {
    const postalCodeFormat = /^[A-Za-z]\d[A-Za-z] ?\d[AA-Za-z]\d$/;

    if (postalCode.trim() === "") {
      setError("Please enter a postal code");
      return false;
    }

    if (!postalCodeFormat.test(postalCode.trim())) {
      setError("Invalid postal code format. Format: A1A 1A1");
      return false;
    }

    setError("");
    return true;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              postalCode={postalCode}
              setPostalCode={setPostalCode}
              postalCodeValidation={postalCodeValidation}
              setSubmittedPostalCode={setSubmittedPostalCode}
              error={error}
              setError={setError}
            />
          }
        />
        <Route
          path="/discover"
          element={
            <DiscoverPage
              postalCode={postalCode}
              setPostalCode={setPostalCode}
              postalCodeValidation={postalCodeValidation}
              submittedPostalCode={submittedPostalCode}
              setSubmittedPostalCode={setSubmittedPostalCode}
              error={error}
              setError={setError}
            />
          }
        />
        <Route path="/events" element={<EventsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
