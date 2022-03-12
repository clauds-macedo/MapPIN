import React, { useState, useEffect } from "react";
import Map, { Marker, Popup } from "react-map-gl";
import { FiStar, FiMapPin } from "react-icons/fi";
import api from "../../services/api";
import "./styles.css";
import "mapbox-gl/dist/mapbox-gl.css";

const MapComponent = () => {

  const MAPBOX_TOKEN = "pk.eyJ1IjoiaW1jbGF1ZHMiLCJhIjoiY2t6bGx0Zmh6MmVmbDMxb2JkM3JkeTcycyJ9.n3x6XAh70HZ2GtbzIVpMCQ";
  
  const [Pins, setPins] = useState([]);
  const [currentPinID, setCurrentPinID] = useState('');

  console.log(currentPinID);

  useEffect(() => {
    const tokenData = async () => {
      const response = await api.get("/v1/pins");
      setPins(response.data);
    };
    tokenData();
  }, []);

  return (
    <div style={{ flex: 1, justifyContent: "center" }}>
      <Map
        initialViewState={{
          latitude: 37.8,
          longitude: -122.4,
          zoom: 3,
        }}
        style={{ width: "90%", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
        onDblClick={(ev) => {
          const [lat, lon] = ev.lngLat;
        }}
      >
        {Pins.map((pin, index) => {
          let stars = Array(pin.rate).fill(<FiStar color="#EBED66" fill="#FBFF26" size={16} />)
          return (
            <div key={index}>
              <Marker
                longitude={pin.longitude}
                latitude={pin.latitude}
              >
                <FiMapPin onClick={() => setCurrentPinID(pin._id)} 
                style={{width: 32, height: 32}} 
                fill="#3FB1CE"
                color="#000"
                />
              </Marker>
              {pin._id === currentPinID && (
              <Popup 
              longitude={pin.longitude} 
              latitude={pin.latitude} 
              anchor="right"
              onClose={() => setCurrentPinID('')}
              >
                <div className="userReview">
                  <div className="userbox">
                    <div className="author">
                      <label className="user">
                        Criado por <b>{pin.user}</b>
                      </label>
                      <label className="date">{new Date(pin.createdAt).toLocaleDateString()} às {new Date(pin.createdAt).toLocaleTimeString()}</label>
                    </div>
                    <div className="userPic">
                      <img src="./assets/pin.png" />
                    </div>
                  </div>
                  <label className="place">
                    Lugar: <b>{pin.title}</b>
                  </label>
                  <label className="description">
                    Descrição: {pin.description}
                  </label>
                  <div className="rate">
                    <label>Avaliação: {stars}</label>
                    <div className="stars">
                      {}
                    </div>
                  </div>
                </div>
              </Popup>
            )}
            </div>
          );
        })}
      </Map>
    </div>
  );
};

export default MapComponent;
