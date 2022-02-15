import React, { Fragment, useRef, useState } from "react";
import Mapir from "mapir-react-component";
import classes from "./App.module.css";

function App() {
  const latitudeRef = useRef();
  const longitudeRef = useRef();
  const [lat, setLat]=useState('');
  const [long, setLong]= useState('');
  let enteredLatitude, enteredLongitude;
  const Map = Mapir.setToken({
    transformRequest: (url) => {
      return {
        url: url,
        headers: {
          "x-api-key":
            process.env.REACT_APP_API_KEY,
          "Mapir-SDK": "reactjs",
        },
      };
    },
  });

  function submitHandler(event) {
    event.preventDefault();
    enteredLatitude = latitudeRef.current.value ;
    enteredLongitude = longitudeRef.current.value ;
    setLat(enteredLatitude)
    setLong(enteredLongitude)
  }
  function locationHandler() {
    navigator.geolocation.getCurrentPosition(function (position) {
      enteredLatitude = position.coords.latitude ;
      enteredLongitude = position.coords.longitude ;
      setLat(enteredLatitude)
      setLong(enteredLongitude)
     
    });
  }
  return (
    <Fragment>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="lat">Latitude</label>
          <input type="number" step="0.00001" required id="lat" ref={latitudeRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="long">Longitude</label>
          <input type="number" step="0.00001" required id="long" ref={longitudeRef} />
        </div>

        <div className={classes.actions}>
          <button>Find the Location</button>
        </div>
      </form>
      <div>
      <div className={classes.actions}>
        <button type="submit" onClick={locationHandler}>
          Find my current location
        </button>
        </div>
        <Mapir
          center={[
            lat|| 51.42047,
            long|| 35.729054,
          ]}
          Map={Map}
        >
          { (
            <Mapir.Marker
              coordinates={[lat, long]}
              anchor="bottom"
            />
          )}
        </Mapir>
      </div>
    </Fragment>
  );
}

export default App;
