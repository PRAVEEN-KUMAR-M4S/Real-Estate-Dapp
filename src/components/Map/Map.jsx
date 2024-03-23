import React from 'react'
import { MapContainer,TileLayer } from "react-leaflet";
import GeoCoderMaker from '../GeoCoderMarker/GeoCoderMaker';
const Map = ({homeaddress,city,country}) => {
  return (
    <MapContainer
    center={[53.35,18.8]}
    zoom={1}
    scrollWheelZoom={false}
    style={{
        height: "50vh",
        width:"100%",
        marginTop:"20px",
        zIndex:0,
    
    }}>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'/>
        <GeoCoderMaker address={`${homeaddress} ${city} ${country}`}/>
    </MapContainer>
  )
}

export default Map