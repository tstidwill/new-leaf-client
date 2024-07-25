import "./EventsPage.scss";
import greenLogo from "../../assets/logos/greenlogo.png";
import { useState, useEffect } from "react";
import axios from "axios";

import pickupImage from "../../assets/images/pexels-shvetsa-5029810.jpg";
import waterImage from "../../assets/images/pexels-danielspase-2091351.jpg";
import treeImage from "../../assets/images/pexels-mikegreer-photos-1390371.jpg";
import conferenceImage from "../../assets/images/pexels-wildlittlethingsphoto-705792.jpg";
import MobileFooter from "../../components/MobileFooter/MobileFooter";

export default function LandingPage() {
  const API_URL = import.meta.env.VITE_CORS_ORIGIN;
  const [events, setEvents] = useState(null);
  const [error, setError] = useState(null);

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
      <div className="logobox">
        <img src={greenLogo} className="logo" alt="leaf logo"></img>
      </div>
      <section className="events">
        <section className="events__headerbox">
          <h3>Upcoming Events</h3>
        </section>

        {error && <p>{error} </p>}
        {events &&
          events.map((event) => {
            return (
              <section className="events__card card" key={event.id}>
                {event.type === "conference" && (
                  <img
                    src={conferenceImage}
                    alt="Conference event"
                    className="card__image"
                  />
                )}
                {event.type === "park_cleanup" && (
                  <img
                    src={pickupImage}
                    alt="Cleaning up park"
                    className="card__image"
                  />
                )}
                {event.type === "tree_planting" && (
                  <img
                    src={treeImage}
                    alt="Seed of a plant"
                    className="card__image"
                  />
                )}
                {event.type === "water_cleanup" && (
                  <img src={waterImage} alt="Lake" className="card__image" />
                )}
                <h4 className="card__title"> {event.name}</h4>
                <div className="card__details">
                  <h5>{event.date}</h5>
                  <h5>
                    {event.location}, {event.city}
                  </h5>
                  <a
                    href={event.link}
                    className="button--square events__button"
                    target="_blank"
                  >
                    Find out more
                  </a>
                </div>
              </section>
            );
          })}
      </section>
      <MobileFooter />
    </>
  );
}
