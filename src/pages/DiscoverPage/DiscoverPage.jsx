import "./DiscoverPage.scss";
import Footer from "../../components/Footer/Footer";
import DiscoverForm from "../../components/DiscoverForm/DiscoverForm";
import MapComponent from "../../components/Map/MapComponent";
import { useState } from "react";

export default function DiscoverPage({
  postalCode,
  setPostalCode,
  postalCodeValidation,
  setSubmittedPostalCode,
  submittedPostalCode,
  error,
  setError,
}) {
  const [selectedType, setSelectedType] = useState("view_all");
  return (
    <>
      <main className="discover">
        <DiscoverForm
          postalCode={postalCode}
          setPostalCode={setPostalCode}
          postalCodeValidation={postalCodeValidation}
          setSubmittedPostalCode={setSubmittedPostalCode}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          error={error}
          setError={setError}
        />
        <MapComponent
          submittedPostalCode={submittedPostalCode}
          selectedType={selectedType}
        />
      </main>
      <Footer />
    </>
  );
}
