import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { saveData } from "./functionsWeb";

const TableComponent = ({ jsonFile }) => {
  const [mixName, setMixName] = useState('');
  const [mixData, setMixData] = useState([]);
  const [jsonData, setJsonData] = useState("");
  useEffect(() => {
    if (jsonFile) {
      loadJSONFile(jsonFile);
    }
  }, [jsonFile]);

  const pickJSONFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/json',
      });

      if (result.type === 'success') {
        setMixName(result.name);

        const fileContents = await fetch(result.uri).then((response) =>
          response.json()
        );

        setMixData(fileContents);
      }
    } catch (err) {
      console.log('Error picking JSON file:', err);
    }
  };
  const loadJSONFile = async (file) => {
    try {
      console.log(file);
      setMixName(file.filename);
      setMixData(file);
      setJsonData(file);
    } catch (err) {
      console.log('Error loading JSON file:', err);
    }
  };
  const handleSave = async () => {
    try {
      saveData(jsonData)
    } catch (err) {
      console.log('Error saving JSON FILE');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{mixName || 'No mix selected'}</Text>
        {//NOT USED WHEN SAVING FROM API<Button title="+" onPress={pickJSONFile} />
        }
        <Button title="Save" onPress={handleSave} disabled={!jsonData} />
      </View>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.cell}>Channel</Text>
          <Text style={styles.cell}>Device</Text>
          <Text style={styles.cell}>Level</Text>
          <Text style={styles.cell}>Pan</Text>
          <Text style={styles.cell}>On</Text>
        </View>

        {mixData && mixData.mixes ? (
          Object.entries(mixData.mixes).map(([channel, mixItem]) => (
            <View key={channel} style={styles.row}>
              <Text style={styles.cell}>{channel}</Text>
              <Text style={styles.cell}>{mixItem.Name}</Text>
              <Text style={styles.cell}>{mixItem.Level}</Text>
              <Text style={styles.cell}>{mixItem.Pan}</Text>
              <Text style={styles.cell}>{mixItem.On ? 'true' : 'false'}</Text>
            </View>
          ))
        ) : (
          // Render something else when mixData or mixData.mixes is undefined
          <Text>No data available</Text>
        )}

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
    padding: 10,
  },
});

export default TableComponent;