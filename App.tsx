import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const onPress = () => setExpanded(!expanded);
  const backgroundStyle = {
    backgroundColor: Colors.white,
  };
  const Triangle = () => {
    return <View style={styles.triangle} />;
  };
  const TriangleDown = () => {
    return <View style={[styles.triangle, styles.triangleDown]} />;
  };
  useEffect(() => {
    fetch('https://run.mocky.io/v3/bde7230e-bc91-43bc-901d-c79d008bddc8')
      .then(response => response.json())
      .then(response => {
        setData(response.userHolding);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  const totalHoldingsValue = {
    currentValue: 0,
    investmentValue: 0,
    todayPnl: 0,
    pnl: 0,
  };
  data.map((holding: any) => {
    const currentValue = holding.ltp * holding.quantity;
    const investmentValue = holding.avgPrice * holding.quantity;
    const todayPnl = (holding.close - holding.ltp) * holding.quantity;
    totalHoldingsValue.currentValue += currentValue;
    totalHoldingsValue.investmentValue += investmentValue;
    totalHoldingsValue.pnl += currentValue - investmentValue;
    totalHoldingsValue.todayPnl = todayPnl;
  });
  return (
    <View style={styles.pageStyle}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <View style={styles.headerContainer}>
          <Text style={styles.headerStyle}>Upstox Holdings</Text>
        </View>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          {data.map((holding: any, index) => (
            <View key={index} style={styles.mainContainer}>
              <View style={styles.holdingContainer}>
                <View style={styles.rowContainer}>
                  <View style={styles.columnContainer}>
                    <Text style={styles.boldStyle}>{holding.symbol}</Text>
                    <Text style={styles.normalStyle}>{holding.quantity}</Text>
                  </View>
                  <View
                    style={[styles.columnContainer, {alignItems: 'flex-end'}]}>
                    <Text>
                      <Text style={styles.normalStyle}>LTP: </Text>
                      <Text style={styles.boldStyle}>₹ {holding.ltp}</Text>
                    </Text>
                    <Text>
                      <Text style={styles.normalStyle}>P/L: </Text>
                      <Text style={styles.boldStyle}>
                        ₹{' '}
                        {(
                          holding.ltp * holding.quantity -
                          holding.avgPrice * holding.quantity
                        ).toFixed(2)}
                      </Text>
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.divider} />
            </View>
          ))}
          <View style={styles.listPadding} />
        </ScrollView>
      </SafeAreaView>
      <TouchableOpacity
        style={styles.footerContainer}
        onPress={onPress}
        activeOpacity={1}>
        {expanded ? <TriangleDown /> : <Triangle />}
        {expanded ? (
          <View style={styles.bottomPadding}>
            <View style={styles.rowContainer}>
              <Text style={styles.boldStyle}>Current Value: </Text>
              <Text style={styles.normalStyle}>
                {totalHoldingsValue.currentValue.toFixed(2)}
              </Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.boldStyle}>Total Investment: </Text>
              <Text style={styles.normalStyle}>
                {totalHoldingsValue.investmentValue.toFixed(2)}
              </Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.boldStyle}>Today's Profit and Loss: </Text>
              <Text style={styles.normalStyle}>
                {totalHoldingsValue.todayPnl.toFixed(2)}
              </Text>
            </View>
          </View>
        ) : (
          <View />
        )}
        <View style={styles.rowContainer}>
          <Text style={styles.boldStyle}>Profit and Loss: </Text>
          <Text style={styles.normalStyle}>
            {totalHoldingsValue.pnl.toFixed(2)}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  pageStyle: {flex: 1, backgroundColor: Colors.white},
  headerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#9033CB',
  },
  headerStyle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#ffffff',
  },
  mainContainer: {
    paddingVertical: 10,
    backgroundColor: '#ffffff',
  },
  holdingContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  normalStyle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },
  boldStyle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  divider: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: '#808080',
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 40,
    paddingHorizontal: 20,
    backgroundColor: '#808080A0',
  },
  listPadding: {
    paddingBottom: 150,
  },
  bottomPadding: {
    paddingBottom: 30,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  columnContainer: {
    justifyContent: 'space-between',
  },
  triangle: {
    alignSelf: 'center',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#9033CB',
    marginBottom: 10,
    marginTop: 4,
  },
  triangleDown: {
    transform: [{rotate: '180deg'}],
  },
});

export default App;
