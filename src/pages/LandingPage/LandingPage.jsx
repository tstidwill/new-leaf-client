import "./LandingPage.scss";
import treeSeedling from "../../assets/images/pexels-akilmazumder-1072824.jpg";
import planetB from "../../assets/images/pexels-markusspiske-2990650.jpg";
import { useNavigate, NavLink, Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import EventCard from "../../components/EventCard/EventCard";
import logo from "../../assets/logos/greenlogo.png";

export default function LandingPage({
  postalCode,
  setPostalCode,
  postalCodeValidation,
  setSubmittedPostalCode,
  error,
  setError,
}) {
  const navigate = useNavigate();

  const handleChange = (e) => {
    setPostalCode(e.target.value);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValidPostalCode = postalCodeValidation(postalCode);
    if (isValidPostalCode) {
      const formattedPostalCode = postalCode.replace(/\s/g, "").toUpperCase();
      setPostalCode(formattedPostalCode);
      setSubmittedPostalCode(formattedPostalCode);
      navigate("/discover");
    }
  };
  const API_URL = import.meta.env.VITE_CORS_ORIGINS;
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    try {
      const response = await axios.get(`${API_URL}/events`);
      setEvents(response.data);
    } catch (error) {
      setEvents([]);
      setError("Error fetching shops");
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      <main className="landingpage">
        <Header />
        <div className="landingpage__body">
          <section className="landingpage__hero hero">
            <div className="hero__content">
              {
                <div className="hero__text-side">
                  <div className="hero__header">
                    <h4 className="hero__subheader">turn&nbsp;over&nbsp;a</h4>
                    <h1 className="hero__title">new leaf</h1>
                  </div>
                  <div className="hero__cta">
                    <h5 className="hero__caption">
                      sustainable living at your fingertips
                    </h5>
                    <form className="hero__form" onSubmit={handleSubmit}>
                      <input
                        type="text"
                        className={`hero__input ${
                          error ? "hero__input--error" : ""
                        }`}
                        placeholder="Enter your area code"
                        name="postalCode"
                        value={postalCode}
                        onChange={handleChange}
                      ></input>
                      <div className="hero__error">{error}</div>
                      <button
                        className="button--round hero__button"
                        type="submit"
                      >
                        discover
                      </button>
                      <NavLink
                        to="/discover"
                        className="button--round hero__button--medium-tablet"
                      >
                        discover
                      </NavLink>
                    </form>
                  </div>
                </div>
              }
              {
                <div className="hero__image-side">
                  <div className="hero__image-container">
                    <img className="hero__image" src={treeSeedling} />
                  </div>
                </div>
              }
            </div>
          </section>
          <section className="landingpage__upcoming upcoming">
            <div className="upcoming__content">
              <h2 className="upcoming__header">Upcoming Events</h2>
              <section className="upcoming__cards">
                {error && <p>{error} </p>}
                {events &&
                  events.map((event) => {
                    return (
                      <EventCard
                        suffix={`landing`}
                        event={event}
                        key={event.id}
                      />
                    );
                  })}
              </section>
            </div>
          </section>
          <section className="landingpage__mission mission">
            <div className="mission__content">
              <h2 className="mission__header">Our Mission</h2>
              <div className="mission__body">
                <img className="mission__image" src={planetB} />
                <section className="mission__textside">
                  <p className="mission__text">
                    Welcome to{" "}
                    <b>
                      New Leaf <img src={logo} className="mission__logo" />
                    </b>
                    , a platform with the mission of empowering communities to
                    live more sustainably. By connecting you with nearby
                    resources like community gardens, thrift shops, and zero
                    waste stores, we aim to make sustainable living accessible
                    and convenient for everyone.
                  </p>
                  <p className="mission__text">
                    Together, we can build a greener, more sustainable future,
                    one area code at a time.
                  </p>{" "}
                  <p className="mission__text">
                    Join us in our journey towards a more eco-friendly
                    lifestyle, and discover the sustainable options available in
                    your neighborhood.
                  </p>
                </section>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </main>
    </>
  );
}
