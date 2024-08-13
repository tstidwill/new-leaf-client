import "./DiscoverPage.scss";
import DiscoverForm from "../../components/DiscoverForm/DiscoverForm";
import MapComponent from "../../components/Map/MapComponent";
import MobileFooter from "../../components/MobileFooter/MobileFooter";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import NearYou from "../../components/NearYou/NearYou";
import NearYouMobile from "../../components/NearYou/NearYouMobile";
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
  const [leaves, setLeaves] = useState(null);
  return (
    <>
      <main className="discover">
        <Header />
        <div className="discover__body">
          <div className="discover__textside">
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

            <NearYou leaves={leaves} />
          </div>
          <MapComponent
            submittedPostalCode={submittedPostalCode}
            selectedType={selectedType}
            leaves={leaves}
            setLeaves={setLeaves}
          />
        </div>
        <NearYouMobile leaves={leaves} />
        <MobileFooter></MobileFooter>
        <Footer />
      </main>
    </>
  );
}
