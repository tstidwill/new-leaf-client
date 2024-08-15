import "./EventCard.scss";
import pickupImage from "../../assets/images/pexels-shvetsa-5029810.jpg";
import waterImage from "../../assets/images/pexels-danielspase-2091351.jpg";
import treeImage from "../../assets/images/pexels-mikegreer-photos-1390371.jpg";
import conferenceImage from "../../assets/images/pexels-wildlittlethingsphoto-705792.jpg";

export default function EventCard({ event, suffix }) {
  return (
    <section className={`eventcard eventcard--${suffix}`} key={event.id}>
      <div
        className={`eventcard__imagecontainer eventcard__imagecontainer--${suffix}`}
      >
        {event.type === "conference" && (
          <img
            src={conferenceImage}
            alt="Conference event"
            className={`eventcard__image eventcard__image--${suffix}`}
          />
        )}

        {event.type === "park_cleanup" && (
          <img
            src={pickupImage}
            alt="Cleaning up park"
            className={`eventcard__image eventcard__image--${suffix}`}
          />
        )}

        {event.type === "tree_planting" && (
          <img
            src={treeImage}
            alt="Seed of a plant"
            className={`eventcard__image eventcard__image--${suffix}`}
          />
        )}

        {event.type === "water_cleanup" && (
          <img
            src={waterImage}
            alt="Lake"
            className={`eventcard__image eventcard__image--${suffix}`}
          />
        )}
      </div>
      <h4 className={`eventcard__title eventcard__title--${suffix}`}>
        {" "}
        {event.name}
      </h4>
      <div className={`eventcard__details eventcard__details--${suffix}`}>
        <div className={`eventcard__text eventcard__text--${suffix}`}>
          <h5 className="eventcard__date">{event.date}</h5>
          <h5 className="eventcard__location">
            {event.location}, {event.city}
          </h5>
        </div>
        <a
          href={event.link}
          className={`button--square button--${suffix}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Find out more
        </a>
      </div>
    </section>
  );
}
