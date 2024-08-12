import "./EventCard.scss";
import pickupImage from "../../assets/images/pexels-shvetsa-5029810.jpg";
import waterImage from "../../assets/images/pexels-danielspase-2091351.jpg";
import treeImage from "../../assets/images/pexels-mikegreer-photos-1390371.jpg";
import conferenceImage from "../../assets/images/pexels-wildlittlethingsphoto-705792.jpg";

export default function EventCard({ event }) {
  return (
    <section className="eventcard" key={event.id}>
      {event.type === "conference" && (
        <img
          src={conferenceImage}
          alt="Conference event"
          className="eventcard__image"
        />
      )}

      {event.type === "park_cleanup" && (
        <img
          src={pickupImage}
          alt="Cleaning up park"
          className="eventcard__image"
        />
      )}

      {event.type === "tree_planting" && (
        <img
          src={treeImage}
          alt="Seed of a plant"
          className="eventcard__image"
        />
      )}

      {event.type === "water_cleanup" && (
        <img src={waterImage} alt="Lake" className="eventcard__image" />
      )}
      <h4 className="eventcard__title"> {event.name}</h4>
      <div className="eventcard__details">
        <h5>{event.date}</h5>
        <h5>
          {event.location}, {event.city}
        </h5>
        <a
          href={event.link}
          className="button--square events__button"
          target="_blank"
          rel="noopener noreferrer"
        >
          Find out more
        </a>
      </div>
    </section>
  );
}
