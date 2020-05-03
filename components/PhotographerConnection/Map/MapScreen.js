import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useDidMountEffect } from "./../../../utils/custom-hook";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import ModalSearch from "./ModalSearch";
import ModalResult from "./ModalResult";
import { useRoute, useNavigation } from "@react-navigation/native";
import { delay } from "../../../utils/f";
import { hereKeyAPI } from "../../../configs/placeAPI";
import axios from "axios";
import request from "./../../../utils/axios";
import { URL } from "./../../../configs/end-points-url";
import ModalLoading from "./ModelLoading";
import ModalSearchbySelect from "./ModalSearchBySelect";
import { ScrollView } from "react-native-gesture-handler";
import { haversine_distance } from "./../../../utils/map";
const window = Dimensions.get("window");

const photographer = (
  <Image
    source={require("./../../../assets/images/marker-2.png")}
    style={{
      height: 55,
      width: 25,
    }}
    resizeMode="contain"
  />
);

const markerRegion = (
  <View style={{ bottom: -10 }}>
    <Image
      source={require("./../../../assets/images/marker-1.png")}
      style={{
        height: 60,
        width: 25,
      }}
      resizeMode="contain"
    />
  </View>
);

const MapScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const regionRef = useRef({
    longitude: 106.2,
    latitude: 21.45,
    longitudeDelta: 0.015,
    latitudeDelta: 0.015,
  });

  const mapRef = useRef(null);
  const [labelSearch, setLabelSearch] = useState(false);
  const [locationSearch, setLocationSearch] = useState(null);
  const [nears, setNears] = useState([]);
  // const [repaint, setRepaint] = useState(false);
  // const [mapLoaded, setMapLoaded] = useState(true);
  // const [searching, setSearching] = useState(false);

  const [switchLocationSearch, setSwitchLocationSearch] = useState(false);
  const modalSearchRef = useRef();
  const modalSearchingRef = useRef();
  const modalSearchBySelectRef = useRef();
  const modalResult = useRef();

  useEffect(() => {
    const { type, payload } = route.params ? route.params : {};
    switch (type) {
      case "SEARCH":
        handleSearchByAddress(payload);
        break;
      case "SEARCH_VIA_MAP":
        openSelectSearch();
        break;
      default:
        break;
    }
  }, [route]);

  useDidMountEffect(() => {
    setTimeout(() => fitNears(nears), 1000);
    if (locationSearch != null) {
      if (nears.length == 0)
        goToRegion({
          ...regionRef.current,
          longitudeDelta: 0.05,
          latitudeDelta: 0.05,
        });
      else goToRegion(regionRef.current, () => setSwitchLocationSearch(true));
    }
  }, [nears, locationSearch]);

  const goToRegion = useCallback((region, callback) => {
    mapRef.current.animateToRegion(region, 1000);
    setTimeout(() => {
      if (callback) {
        callback();
      }
    }, 1200);
  });

  const searchAdressByLocation = useCallback(async (location) => {
    const searchUrl =
      "https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?" +
      "&mode=retrieveAddresses" +
      "&maxresults=1&gen=9" +
      "&prox=" +
      location.latitude +
      "," +
      location.longitude +
      "," +
      "250" +
      "&apiKey=" +
      hereKeyAPI;

    axios
      .get(searchUrl)
      .then((response) => {
        const data = response.data.Response.View[0].Result[0].Location.Address;
        const { Street, District, City } = data ? data : {};

        const labelLocation = `${Street ? Street + ", " : ""}${
          District ? District + ", " : ""
        }${City ? City : ""}`;

        setLabelSearch(labelLocation);
      })
      .catch((error) => console.log(error));
  });

  // 1. Handle search By Click on Search Your Location
  const searchMyLocation = useCallback(async () => {
    modalSearchRef.current.close();
    modalSearchingRef.current.open();
    const location = await askPermision("ASK");
    searchAdressByLocation(location);
    searchNears(location);
  });

  // 2. Handle Search Via map
  const handleSearchViaMap = useCallback(async () => {
    modalSearchBySelectRef.current.close();
    modalSearchingRef.current.open();
    searchAdressByLocation(regionRef.current);
    searchNears(regionRef.current);
    await delay(200);
  });

  // 3. Handle Search By Address. From type search address screen.
  const handleSearchByAddress = useCallback(async (payload) => {
    modalSearchRef.current.close();
    modalSearchingRef.current.open();
    setLabelSearch(payload.labelLocation);

    const data = await searchLocation(payload.location);
    searchNears(data);
  });

  // For handle Search By Address. Need to retrieve location of address to display new region
  const searchLocation = useCallback(async (location) => {
    const locationId = location.locationId;
    const searchUrl =
      "https://geocoder.ls.hereapi.com/6.2/geocode.json?locationid=" +
      locationId +
      "&jsonattributes=1&gen=9&apiKey=" +
      hereKeyAPI;
    const response = await axios.get(searchUrl);
    const data =
      response.data.response.view[0].result[0].location.displayPosition;

    regionRef.current = { ...regionRef.current, ...data };
    return data;
  });

  const searchNears = useCallback(async (coords) => {
    console.log("COORD", coords);
    const response = await request.server.post(URL.SEARCH_NEARBY(), {
      coords: {
        latitude: coords.latitude,
        longitude: coords.longitude,
      },
    });

    const data = response.data;

    if (data.status) {
      const nears = [];
      data.locations.forEach((location) => {
        if (haversine_distance(location, coords) < 5) nears.push(location);
      });
      setLocationSearch(coords);
      setNears(nears);
    }

    modalSearchBySelectRef.current.close();
    modalSearchingRef.current.close();
    await delay(150);
    modalResult.current.open();
  });

  const openSelectSearch = useCallback(async () => {
    modalSearchRef.current.close();
    modalSearchBySelectRef.current.open();
  });

  const renderMarkers = useCallback(() => {
    return (
      <View>
        {nears.map((near, idx) => {
          return (
            <Marker
              key={idx}
              coordinate={near}
              title={near.photographerInfor.name}
              description="I'm photographer"
            >
              {photographer}
            </Marker>
          );
        })}
      </View>
    );
  });

  const renderDirection = useCallback(() => {});

  const askPermision = useCallback(async (method = "GET") => {
    try {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);

      if (status != "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync();
      regionRef.current = { ...regionRef.current, ...location.coords };

      if (method == "GET")
        goToRegion({ ...regionRef.current, ...location.coords });
      return location.coords;
    } catch (error) {
      console.log(error);
    }
  });

  const onRegionChangeComplete = (region) => {
    regionRef.current = region;
    // setRegion(region);
  };

  const reset = useCallback(() => {
    modalResult.current.close();
    modalSearchBySelectRef.current.close();
    modalSearchRef.current.open();

    setSwitchLocationSearch(false);
    setLocationSearch(null);
    setLabelSearch(false);
    setNears([]);
  });

  const fitNears = useCallback(() => {
    const { latitude, longitude } = regionRef.current;
    if (nears.length > 0) {
      const oppositeNears = [];
      for (const near of nears) {
        const oppositeNear = {
          latitude: latitude * 2 - near.latitude,
          longitude: longitude * 2 - near.longitude,
        };
        oppositeNears.push(oppositeNear);
      }

      mapRef.current.fitToCoordinates([...nears, ...oppositeNears], {
        edgePadding: {
          top: window.height * 1.3 * 0.55,
          right: 20,
          left: 20,
          bottom: window.height * 1.3 * 0.55,
        },
        animated: true,
      });
    }
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      enabled={false}
      style={{ flex: 1, justifyContent: "flex-end" }}
    >
      <MapView
        ref={(ref) => (mapRef.current = ref)}
        moveOnMarkerPress={false}
        // loadingEnabled={searching}
        rotateEnabled={true}
        showsUserLocation={true}
        pointerEvents="none"
        initialRegion={regionRef.current}
        style={{
          position: "absolute",
          height: window.height * 1.3,
          width: window.width,
          bottom: 0,
        }}
        onRegionChangeComplete={onRegionChangeComplete}
        onLayout={() => fitNears(nears)}
      >
        {switchLocationSearch ? (
          <Marker key={123456} coordinate={locationSearch}>
            {markerRegion}
          </Marker>
        ) : null}
        {renderMarkers()}
        {renderDirection()}
      </MapView>

      {!switchLocationSearch ? (
        <View style={styles.markerFake}>{markerRegion}</View>
      ) : null}

      <ModalSearch
        ref={modalSearchRef}
        location={route.params}
        labelSearch={labelSearch}
        getMyLocation={askPermision}
        searchMyLocation={searchMyLocation}
      />

      <ModalLoading ref={modalSearchingRef} />

      <ModalSearchbySelect
        ref={modalSearchBySelectRef}
        searchRegion={handleSearchViaMap}
        reset={reset}
      />

      <ModalResult
        reset={reset}
        ref={modalResult}
        nears={nears}
        labelSearch={labelSearch}
        locationSearch={locationSearch}
      />
    </KeyboardAvoidingView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  markerFake: {
    left: "50%",
    marginLeft: -13,
    marginTop: -56,
    position: "absolute",
    top: window.height * 0.35,
  },
});
