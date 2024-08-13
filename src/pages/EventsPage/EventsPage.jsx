import "./EventsPage.scss";
import { useState, useEffect } from "react";
import axios from "axios";

import MobileFooter from "../../components/MobileFooter/MobileFooter";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import EventCard from "../../components/EventCard/EventCard";
export default function EventsPage() {
  const API_URL = import.meta.env.VITE_CORS_ORIGINS;
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
      <section className="events">
        <Header />
        <section className="events__body">
          <section className="events__headerbox">
            <h3>Upcoming Events</h3>
          </section>

          <section className="events__cards">
            {error && <p>{error} </p>}
            {events &&
              events.map((event) => {
                return <EventCard event={event} key={event.id} />;
              })}
          </section>
        </section>
        <MobileFooter />
        <Footer />
      </section>
    </>
  );
}
