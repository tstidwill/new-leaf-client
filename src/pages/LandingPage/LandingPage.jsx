import "./LandingPage.scss";
import greenLogo from "../../assets/logos/greenlogo.png";
import treeSeedling from "../../assets/images/pexels-akilmazumder-1072824.jpg";
import { useNavigate, NavLink } from "react-router-dom";
import DiscoverPage from "../DiscoverPage/DiscoverPage";

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

  return (
    <>
      <main className="landingpage">
        <div className="landingpage__header header">
          <img
            src={greenLogo}
            className="header__logo logo"
            alt="leaf logo"
          ></img>
          <ul className="header__nav">
            <NavLink to="/" className="header__navlink">
              home
            </NavLink>
            <NavLink to="/discover" className="header__navlink">
              discover
            </NavLink>
            <NavLink to="/events" className="header__navlink">
              events
            </NavLink>
          </ul>
        </div>
        <div className="landingpage__body">
          <section className="landingpage__hero hero">
            <div className="hero__text-side">
              <div className="hero__header">
                <h4 className="hero__subheader">turn over a</h4>
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
                    placeholder="Enter your postal code.."
                    name="postalCode"
                    value={postalCode}
                    onChange={handleChange}
                  ></input>
                  <div className="hero__error">{error}</div>
                  <button className="button--round hero__button" type="submit">
                    <h6>discover</h6>
                  </button>
                  <NavLink to="/discover">
                    {" "}
                    <a className="button--round hero__button--tablet">
                      discover
                    </a>
                  </NavLink>
                </form>
              </div>
            </div>
            <div className="hero__image-side">
              <div className="hero__image-container">
                <img className="hero__image" src={treeSeedling} />
              </div>
            </div>
          </section>
          <section className="landingpage__upcoming upcoming">
            <h2 className="upcoming__header">Upcoming Events</h2>
            <div className="upcoming__container"></div>
          </section>
          <section className="landingpage__mission mission">
            <h2 className="mission__header">Mission</h2>
            <p className="mission__text">
              New Leaf was created by Tara Stidwill as a Capstone Project for
              BrainStation's Software Engineering Bootcamp aimed at making
              sustainable living the norm.{" "}
            </p>
          </section>
        </div>
        <footer className="footer">login register</footer>
      </main>
    </>
  );
}
