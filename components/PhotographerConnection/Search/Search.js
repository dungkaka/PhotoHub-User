import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import { color, delay } from "./../../../utils/f";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./index.style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { hereKeyAPI } from "./../../../configs/placeAPI";
import axios from "axios";

const baseUrl =
  "https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?";

const Search = () => {
  const navigation = useNavigation();

  const [searching, setSearching] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const textRef = useRef("");
  const canSearch = useRef(true);
  let timeOutSearch = 0;

  useEffect(() => {
    const i = setInterval(() => {
      canSearch.current = true;
    }, 2000);
    return () => {
      clearInterval(i);
    };
  }, []);

  const renderUrl = (location) => {
    const _location = location;
    return (
      baseUrl +
      "query=" +
      _location +
      "&maxresults=" +
      5 +
      "&country=VNM" +
      "&apiKey=" +
      hereKeyAPI
    );
  };

  const searchLocation = async (value) => {
    if (timeOutSearch) clearTimeout(timeOutSearch);
    timeOutSearch = setTimeout(async () => {
      if (value.length == 0) {
        setSearchResult([]);
        return;
      }

      if (canSearch.current && value.length > 2) {
        canSearch.current = false;
        setSearching(true);

        console.log("-------------------LOADNG", value);
        const response = await axios.get(renderUrl(value));
        const data = response.data;
        setSearchResult(data.suggestions);
        setSearching(false);
        console.log("-------------------FINISH LOADNG", value);
      }
    }, 1000);
  };

  // const searchLocation = async (value) => {
  //   if (value.length == 0) {
  //     setSearchResult([]);
  //     return;
  //   }
  //   if (canSearch.current && value.length > 2) {
  //     canSearch.current = false;

  //     setSearching(true);
  //     console.log("-------------------LOADNG", value);
  //     const response = await axios.get(renderUrl(value));
  //     console.log("-------------------FINISH LOADNG", value);
  //     await delay(1000);
  //     setSearching(false);

  //     const data = response.data;
  //     setSearchResult(data.suggestions);

  //     console.log("CURRENT - PRE", textRef.current, value);
  //     await delay(1000);
  //     if (textRef.current != value) {
  //       console.log("Continue to search", textRef.current);
  //       searchLocation(textRef.current);
  //     }
  //   }
  // };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons
          name="lastpass"
          style={styles.inputIcon}
        ></MaterialCommunityIcons>
        <TextInput
          style={styles.input}
          onChangeText={(value) => {
            textRef.current = value;
            searchLocation(textRef.current);
          }}
        />
      </View>

      <View style={{ flex: 1 }}>
        {searching ? (
          <Text>LOADING</Text>
        ) : (
          <FlatList
            style={{ margin: 4 }}
            numColumns={2}
            keyExtractor={(item) => item.locationId}
            data={searchResult}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("MapScreen", {
                    type: "SEARCH",
                    payload: {
                      location: item,
                    },
                  })
                }
              >
                <Text
                  style={{ backgroundColor: "green", margin: 10, padding: 10 }}
                >
                  {" "}
                  {item.label}{" "}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
};

export default Search;
