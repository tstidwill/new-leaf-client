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
        <section className="discover-mobile">
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
          <section className="discover__map discover__map--mobile">
            <MapComponent
              submittedPostalCode={submittedPostalCode}
              selectedType={selectedType}
              leaves={leaves}
              setLeaves={setLeaves}
            />
          </section>
          <NearYouMobile leaves={leaves} />
          <MobileFooter />
        </section>

        <section className="discover-desktop">
          <div className="discover-desktop__textside">
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
          <div className="discover-desktop__mapside">
            <MapComponent
              submittedPostalCode={submittedPostalCode}
              selectedType={selectedType}
              leaves={leaves}
              setLeaves={setLeaves}
            />
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
