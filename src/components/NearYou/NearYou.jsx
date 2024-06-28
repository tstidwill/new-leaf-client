import "./NearYou.scss";
import groceryImage from "../../assets/images/pexels-sarah-chai-7263016.jpg";
import thriftImage from "../../assets/images/pexels-cottonbro-6068960.jpg";
import gardenImage from "../../assets/images/pexels-markusspiske-2847908.jpg";

export default function NearYou({ leaves }) {
  return (
    <section className="nearyou">
      <h3 className="nearyou__header">near you</h3>
      {leaves &&
        leaves.map((shop) => (
          <section key={shop.id} className="nearyou__card">
            <div className="nearyou__text">
              <h4>{shop.name}</h4>

              <p className="nearyou__address">{shop.address}</p>

              <p>{shop.description}</p>
              {shop.website && (
                <a
                  className="nearyou__button button--square"
                  href={shop.website}
                  target="_blank"
                >
                  Find out more
                </a>
              )}
            </div>
            <div className="nearyou_imagecontainer">
              {shop.type === "zero_waste_grocery" && (
                <img
                  src={groceryImage}
                  alt="Basket of Produce"
                  className="nearyou__image"
                />
              )}
              {shop.type === "thrift" && (
                <img
                  src={thriftImage}
                  alt="Thrift Shopping"
                  className="nearyou__image"
                />
              )}
              {shop.type === "garden" && (
                <img
                  src={gardenImage}
                  alt="Thrift Shopping"
                  className="nearyou__image"
                />
              )}
            </div>
          </section>
        ))}
    </section>
  );
}
