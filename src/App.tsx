import * as React from "react";
import { useRef } from "react";
import "../assets/fonts/BerkshireSwashRegular.ttf";
import "../assets/fonts/InconsolataRegular.ttf";
import {
  Animated,
  View,
  TouchableOpacity,
  Text,
  Button,
  PanResponder,
  FlatList,
  Alert,
  StatusBar,
  StyleSheet,
  ReactNativeComponentTree
} from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import SQLite from "react-native-sqlite-storage";
import { useSelector, useDispatch } from "react-redux";
import {
  setName,
  setAge,
  increaseAge,
  setCardFacing,
  flipCard
} from "./redux/actions";

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
    backgroundColor: "#000000aa"
  },
  scorerow: {
    width: 260,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  spot: {
    width: 40,
    height: 64,
    borderRadius: 2,
    flex: 1,
    backgroundColor: "#ffffff10",
    marginVertical: 6,
    marginHorizontal: 6,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#00000080",
    borderWidth: 1
  },
  card_value: {
    fontSize: 25,
    fontFamily: "Berkshire Swash"
  },
  card_suit: {
    fontSize: 25
  },
  card_value_red: {
    fontSize: 25,
    fontFamily: "Berkshire Swash",
    color: "red"
  },
  card_suit_red: {
    fontSize: 25,
    color: "red"
  },
  card_value_black: {
    fontSize: 25,
    fontFamily: "Berkshire Swash",
    color: "black"
  },
  card_suit_black: {
    fontSize: 25,
    color: "black"
  },
  card: {
    width: 40,
    height: 64,
    borderRadius: 2,
    backgroundColor: "#673147",
    marginVertical: 6,
    marginHorizontal: 6,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#673147",
    borderWidth: 1
  },
  card_red: {
    width: 40,
    height: 64,
    borderRadius: 2,
    backgroundColor: "white",
    marginVertical: 6,
    marginHorizontal: 6,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "red",
    borderWidth: 1
  },
  card_black: {
    width: 40,
    height: 64,
    borderRadius: 2,
    backgroundColor: "white",
    marginVertical: 6,
    marginHorizontal: 6,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 1
  },
  deck: {
    width: 40,
    height: 64,
    borderRadius: 2,
    backgroundColor: "#673147",
    marginVertical: 6,
    marginHorizontal: 6,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#673147"
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
    fontSize: 40,
    fontFamily: "Berkshire Swash"
  },
  score_text: {
    fontSize: 20,
    fontFamily: "Inconsolata"
  },
  emp: {
    backgroundColor: "#77b55a",
    marginVertical: -0
  }
});

let pattSpots = [];
let cardSpots = [];
const onPress = () => Alert.alert("Spot has been pressed.");
const PCard = ({ cid }) => {
  const suits = ["♣", "♦", "♠", "♥"];
  const values = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A"
  ];
  let isRed = Math.floor(cid / 13) % 2 == 1;
  return (
    <View style={isRed === true ? styles.card_red : styles.card_black}>
      <Text
        style={isRed === true ? styles.card_value_red : styles.card_value_black}
      >
        {values[cid % 13]}
      </Text>
      <Text
        style={isRed === true ? styles.card_suit_red : styles.card_suit_black}
      >
        {suits[Math.floor(cid / 13)]}
      </Text>
    </View>
  );
};
function App() {
  const { name, age, side } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
      onPanResponderRelease: () => {
        Animated.spring(pan, { toValue: { x: pan.x, y: pan.y } }).start();
      }
    })
  ).current;

  const panTo = () => {
    //const pos = ReactNativeComponentTree.getInstanceFromNode( event.currentTarget)._currentElement.props.ValueXY;
    Animated.spring(pan, { toValue: { x: 0, y: 0 } }).start();
  };
  const press = (event, index) => {
    const ox = -52;
    const oy = -380;
    const ax = index % 5;
    const ay = Math.floor(index / 5);
    const nx = ox + ax * 52;
    const ny = oy + ay * 76;
    //only want to move active card
    Animated.spring(pan, { toValue: { x: nx, y: ny } }).start();
    //do gamd state logic
  };
  const CardSpot = (props) => {
    const spotClicked = (e) => {
      props.press(e, props.csid);
    };
    return <TouchableOpacity style={styles.spot} onPress={spotClicked} />;
  };
  const toggleCard = useRef(new Animated.Value(1)).current;
  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(toggleCard, {
      toValue: 1,
      duration: 150
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(toggleCard, {
      toValue: 0,
      duration: 150
    }).start();
  };
  const toggleFade = (val) => {
    Animated.timing(toggleCard, {
      toValue: val,
      duration: 150
    }).start();
  };
  const renderCardSpot = ({ item }) => {
    return <CardSpot csid={item.csid} press={press} />;
  };
  // <CardSpot csid={item.csid} press={this.press}/>;

  for (let _i = 0; _i < 25; _i++) {
    if (_i === 0) cardSpots = [];
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
        <Text style={styles.score_text}>Score: 9900</Text>
        <Text style={styles.score_text}>??/25 Patts dealt</Text>
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
        <Animated.View
          style={[
            {
              transform: [{ translateX: pan.x }, { translateY: pan.y }]
            }
          ]}
          // {...panResponder.panHandlers}
        >
          <PCard cid={"51"} />
        </Animated.View>
        <TouchableOpacity style={styles.abtn} onPress={fadeOut}>
          <Text style={styles.abtn_text}>Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default App;
