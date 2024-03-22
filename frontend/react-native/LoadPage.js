import React, { useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, Button, View, Text } from "react-native";
import { setYamahaProfile, setSingleYamahaMix } from "./functionsWeb";
import TableComponent from './loadTableComponent';

const LoadPage = () => {
  const [ip, onChangeIP] = useState("");
  const [port, onChangePort] = useState("");
  const [channel, onChangeChannel] = useState("");
  const [mix, onChangeMix] = useState("");
  const [data, setData] = useState(null);
  const [dataSingle, setDataSingle] = useState(null);
  const [jsonFile, setJsonFile] = useState(null);
  const [mixData, setMixData] = useState([]);
  //define event to get json and set to data
  //Ensure bool is set to false to enable dummy mode.
  const handlePress = async () => {
    //const result = await getYamahaProfile(ip, port, mix, channel,true);
    const resultSingle = await setSingleYamahaMix(ip, port, mix, channel, true, mixData);
    //loadJSONFromAPI(resultSingle, setMixName, setMixData);
    //setData(result);
    //setDataSingle(resultSingle);
    setJsonFile(resultSingle);
  };


  const handleMixDataUpdate = (newMixData) => {
    setMixData(newMixData);
    console.log(newMixData);
  };

  return (
    <View>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={onChangeIP}
          value={ip}
          placeholder="Enter IP Address"
          keyboardType="decimal-pad"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePort}
          value={port}
          placeholder="Enter Port"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeChannel}
          value={channel}
          placeholder="Enter Channel"
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeMix}
          value={mix}
          placeholder="Enter Mix"
          keyboardType="numeric"
        />
      </SafeAreaView>

      <Button
        title="Load Mix To Console"
        onPress={handlePress}
        disabled={mixData.length === 0}
      />
      {//data && <Text>{JSON.stringify(data)}</Text>}
      }
      {//dataSingle && <Text>{JSON.stringify(dataSingle)}</Text>}
      }
      <TableComponent onMixDataUpdate={handleMixDataUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default LoadPage;