import "./NearYouMobile.scss";
import groceryImage from "../../assets/images/pexels-sarah-chai-7263016.jpg";
import thriftImage from "../../assets/images/pexels-cottonbro-6068960.jpg";
import gardenImage from "../../assets/images/pexels-markusspiske-2847908.jpg";

export default function NearYouMobile({ leaves }) {
  return (
    <section className="nymobile">
      {leaves && <h3 className="nymobile__header">near you</h3>}
      {leaves &&
        leaves.map((shop) => (
          <section key={shop.id} className="nymobile__card">
            <div className="nymobile__text">
              <h4>{shop.name}</h4>

              <p className="nymobile__address">{shop.address}</p>

              <p>{shop.description}</p>
              {shop.website && (
                <a
                  className="nymobile__button button--square"
                  href={shop.website}
                  target="_blank"
                >
                  Find out more
                </a>
              )}
            </div>
            <div className="nymobile__imagecontainer">
              {shop.type === "zero_waste_grocery" && (
                <img
                  src={groceryImage}
                  alt="Basket of Produce"
                  className="nymobile__image"
                />
              )}
              {shop.type === "thrift" && (
                <img
                  src={thriftImage}
                  alt="Thrift Shopping"
                  className="nymobile__image"
                />
              )}
              {shop.type === "garden" && (
                <img
                  src={gardenImage}
                  alt="Thrift Shopping"
                  className="nymobile__image"
                />
              )}
            </div>
          </section>
        ))}
    </section>
  );
}
