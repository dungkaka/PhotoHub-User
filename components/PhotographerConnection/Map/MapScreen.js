import React, { useState, useEffect, useRef } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useDidMountEffect } from "./../../../utils/custom-hook";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import ModalSearch from "./ModalSearch";
import ModalResult from "./ModalResult";
import { useRoute } from "@react-navigation/native";
import { delay } from "../../../utils/f";
import { hereKeyAPI } from "../../../configs/placeAPI";
import axios from "axios";
import request from "./../../../utils/axios";
import { URL } from "./../../../configs/end-points-url";
import BottomSheet from "reanimated-bottom-sheet";
import ModalLoading from "./ModelLoading";

const MapScreen = () => {
  const route = useRoute();
  const [region, setRegion] = useState({
    longitude: 106.2,
    latitude: 21.45,
    longitudeDelta: 0.05,
    latitudeDelta: 0.05,
  });

  const [nears, setNears] = useState([]);
  const [repaint, setRepaint] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchVisible, setSearchVisible] = useState(true);
  const [resultVisible, setResultVisible] = useState(false);

  useDidMountEffect(() => {
    const { type, payload } = route ? route.params : {};
    switch (type) {
      case "SEARCH":
        handleSearch(payload);
        break;
      default:
        break;
    }
  }, [route]);

  useEffect(() => {
    setMapLoaded(true);
  }, []);

  const reset = () => {
    setSearchVisible(true);
    setResultVisible(false);
    setNears([]);
  };

  const handleSearch = async (payload) => {
    setSearchVisible(false);
    setSearching(true);

    const data = await searchLocation(payload.location);
    console.log(data);
    searchNears(data);
  };

  const searchLocation = async (location) => {
    const locationId = location.locationId;
    const searchUrl =
      "https://geocoder.ls.hereapi.com/6.2/geocode.json?locationid=" +
      locationId +
      "&jsonattributes=1&gen=9&apiKey=" +
      hereKeyAPI;
    const response = await axios.get(searchUrl);
    const data =
      response.data.response.view[0].result[0].location.displayPosition;
    setRegion({ ...region, ...data });
    return data;
  };

  const searchNears = async (coords) => {
    await delay(300);
    const response = await request.server.post(URL.SEARCH_NEARBY(), {
      coords: {
        latitude: coords.latitude,
        longitude: coords.longitude,
      },
    });

    const data = response.data;
    console.log(data);

    if (data.status) {
      setNears(data.locations);
    }

    setSearching(false);
    delay(300);
    setResultVisible(true);

    // setNears([
    //   {
    //     longitude: 106.2,
    //     latitude: 21.45,
    //   },
    //   {
    //     longitude: 106.205,
    //     latitude: 21.4505,
    //   },
    //   {
    //     longitude: 106.21,
    //     latitude: 21.451,
    //   },
    // ]);
  };

  const renderMarkers = () => {
    return (
      <View>
        {nears.map((near, idx) => {
          return <Marker key={idx} coordinate={near} />;
        })}
      </View>
    );
  };

  const askPermision = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status != "granted") {
      console.log("Permission to access location was denied");
    }

    let location = await Location.getCurrentPositionAsync();
    console.log(location);

    setRegion({ ...region, ...location.coords });
  };

  const onRegionChangeComplete = (region) => {
    setRegion(region);
  };

  if (!mapLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large"></ActivityIndicator>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "flex-end" }}>
      <MapView
        showsUserLocation
        region={region}
        style={{ flex: 1 }}
        onRegionChangeComplete={onRegionChangeComplete}
      >
        {renderMarkers()}
      </MapView>

      <ModalSearch visible={searchVisible} location={route.params} />

      <ModalLoading visible={searching} />

      {resultVisible ? (
        <ModalResult reset={reset} visible={resultVisible} nears={nears} />
      ) : null}
    </View>
  );
};

export default MapScreen;
