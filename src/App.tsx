import * as React from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  Alert,
  StatusBar,
  StyleSheet
} from "react-native";
import { Provider } from "react-redux";
import { Store } from "./redux/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SQLite from "react-native-sqlite-storage";
import { useSelector, useDispatch } from "react-redux";
// import { setName, setAge, increaseAge } from './redux/actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    marginBottom: 72,
    backgroundColor: "#538a46",
    justifyContent: "center",
    alignItems: "center"
  },
  deckrow: {
    width: 260,
    flexDirection: "row",
    backgroundColor: "#00000030"
  },
  scorerow: {
    width: 260,
    flexDirection: "row",
    justifyContent: "end"
  },
  spot: {
    width: 40,
    height: 64,
    borderRadius: 2,
    flex: 1,
    backgroundColor: "white",
    marginVertical: 6,
    marginHorizontal: 6,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black"
  },
  spot_value: {
    fontSize: 20
  },
  spot_suit: {
    fontSize: 20
  },
  card: {
    width: 40,
    height: 64,
    borderRadius: 2,
    backgroundColor: "white",
    marginVertical: 6,
    marginHorizontal: 6,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black"
  },
  deck: {
    width: 40,
    height: 64,
    borderRadius: 2,
    backgroundColor: "white",
    marginVertical: 6,
    marginHorizontal: 6,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black"
  },
  abtn: {
    height: 64,
    width: 144,
    backgroundColor: "#77b55a",
    borderRadius: 2,
    marginVertical: 6,
    marginHorizontal: 6,
    alignItems: "center",
    justifyContent: "center"
  },
  abtn_text: {
    fontSize: 30
  },
  score_text: {
    fontSize: 18
  },
  emp: {
    backgroundColor: "#77b55a",
    marginVertical: -0
  }
});

let pattSpots = [];
let cardSpots = [];
const CardSpot = ({ csid }) => (
  <View style={styles.spot}>
    <Text style={styles.spot_value}>{csid}</Text>
    <Text style={styles.spot_suit}>{"♣"}</Text>
  </View>
);

function App() {
  // const { name, age } = useSelector(state => state.userReducer);
  // const dispatch = useDispatch();
  const renderCardSpot = ({ item }) => <CardSpot csid={item.csid} />;
  for (let _i = 0; _i < 25; _i++) {
    if (_i == 0) cardSpots = [];
    cardSpots.push({
      csid: _i.toString(),
      value: null
    });
  }
  for (let _i = 0; _i < 25; _i++) {
    pattSpots.push({
      pid: _i,
      value: null
    });
  }
  return (
    <View style={styles.container}>
      <View style={styles.scorerow}>
        <Text style={styles.score_text}>Score: 9999 - ??/25 Patts found</Text>
      </View>
      <View>
        <FlatList
          style={styles.emp}
          data={cardSpots}
          renderItem={renderCardSpot}
          keyExtractor={(item, index) => index.toString()}
          numColumns={5}
        />
      </View>
      <View style={styles.deckrow}>
        <View style={styles.deck} />
        <View style={styles.card} />
        <View style={styles.abtn}>
          <Text style={styles.abtn_text}>Start</Text>
        </View>
      </View>
    </View>
  );
}

export default App;
