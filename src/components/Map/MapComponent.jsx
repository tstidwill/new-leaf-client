import { useEffect, useState } from "react";
import "./MapComponent.scss";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import axios from "axios";
import newleafMarker from "../../assets/icons/newleaf_marker.png";
import NearYou from "../NearYou/NearYou";

export default function MapComponent({
  submittedPostalCode,
  selectedType,
  leaves,
  setLeaves,
}) {
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const API_URL = import.meta.env.VITE_CORS_ORIGINS;
  const MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID;

  const [markerRef, marker] = useAdvancedMarkerRef();
  const [coordinates, setCoordinates] = useState(null);
  const [error, setError] = useState(null);

  const [selectedShop, setSelectedShop] = useState(null);
  const [loading, setLoading] = useState(true);

  const geocodePostalCode = async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${submittedPostalCode}&key=${API_KEY}`
      );
      const data = response.data;
      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        setCoordinates({ lat, lng });
        setError(null);
      } else {
        setError("No coordinates found for that postal code");
      }
    } catch (error) {
      setError("Error fetching geocode data");
    }
  };

  const getThriftStores = async (coordinates) => {
    try {
      await axios.get(
        `${API_URL}/api/searchThriftStores?lat=${coordinates.lat}&lng=${coordinates.lng}`
      );
    } catch (error) {
      setError("Error fetching thrift shops");
    }
  };

  const getCommunityGardens = async (coordinates) => {
    try {
      await axios.get(
        `${API_URL}/api/searchCommunityGardens?lat=${coordinates.lat}&lng=${coordinates.lng}`
      );
    } catch (error) {
      setError("Error fetching community gardens");
    }
  };

  const getLocationsWithinDistance = async (coordinates, selectedType) => {
    try {
      const response = await axios.get(`${API_URL}/leaves`);
      console.log("Fetched leaves:", response.data);

      if (response.data.length > 0) {
        const filteredShops = response.data.filter((shop) => {
          const latWithinRange =
            shop.lat >= coordinates.lat - 0.01 &&
            shop.lat <= coordinates.lat + 0.01;
          const lngWithinRange =
            shop.lng >= coordinates.lng - 0.01 &&
            shop.lng <= coordinates.lng + 0.01;

          const typeMatch =
            selectedType === "view_all" || shop.type === selectedType;
          return latWithinRange && lngWithinRange && typeMatch;
        });

        console.log("Filtered shops:", filteredShops);
        setLeaves(filteredShops);
        setError(null);
      } else {
        setLeaves([]);
        setError("No shops found");
      }
    } catch (error) {
      setLeaves([]);
      setError("Error fetching shops");
    }
  };

  const handleMarkerClick = (shop) => {
    setSelectedShop(shop);
  };

  useEffect(() => {
    if (submittedPostalCode) {
      geocodePostalCode();
    }
  }, [submittedPostalCode]);

  useEffect(() => {
    const fetchData = async () => {
      if (coordinates) {
        try {
          await getThriftStores(coordinates);
          await getCommunityGardens(coordinates);
          getLocationsWithinDistance(coordinates, selectedType);
          setLoading(false);
        } catch (error) {
          setError("Error fetching data");
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [coordinates, selectedType]);

  return (
    <section className="mapcomponent">
      <APIProvider apiKey={API_KEY}>
        {loading && coordinates && (
          <div className="map-container">
            <p className="mapcomponent__loading">Loading...</p>
          </div>
        )}
        {!submittedPostalCode && (
          <div className="map-container">
            <p className="map-container__prompt">
              Please enter a postal code above
            </p>
          </div>
        )}
        {coordinates && !loading && (
          <Map
            className="map-container"
            center={{ lat: coordinates.lat, lng: coordinates.lng }}
            defaultZoom={14}
            mapId={MAP_ID}
          >
            {leaves &&
              leaves.map((shop) => {
                const lat = parseFloat(shop.lat);
                const lng = parseFloat(shop.lng);

                return (
                  <AdvancedMarker
                    key={shop.id}
                    position={{ lat, lng }}
                    title={shop.name}
                    onClick={() => handleMarkerClick(shop)}
                  >
                    <img src={newleafMarker} className="marker" alt="Marker" />
                  </AdvancedMarker>
                );
              })}
            {selectedShop && (
              <InfoWindow
                position={{
                  lat: parseFloat(selectedShop.lat),
                  lng: parseFloat(selectedShop.lng),
                }}
                onCloseClick={() => setSelectedShop(null)}
              >
                <p>{selectedShop.name}</p>
              </InfoWindow>
            )}
          </Map>
        )}
      </APIProvider>
      {/* <NearYou leaves={leaves} /> */}
    </section>
  );
}
