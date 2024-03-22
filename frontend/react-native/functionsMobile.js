import TcpSocket from 'react-native-tcp-socket';
import { Platform } from 'react-native';
import RNFS from 'react-native-fs'; 
/*
This function will take expects the response of a JSON file after being parsed with .json()
This will create a link that will wbe autoclicked for users to download the configuration file.
*/
async function saveData(data) {
  try {
    // create a new blob with the JSON data
    const path = Platform.OS === 'ios' ? RNFS.DocumentDirectoryPath : RNFS.ExternalDirectoryPath;
    const filePath = `${path}/data.json`;
    await RNFS.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    
    //return data to caller
    return data;
  } catch (err) {
    console.log(err);
  }
}
function initTCPSocket(ip, port) {
  // create a new TcpSocket instance
  const sock = TcpSocket.createConnection({ port: port, host: ip });
  
  return sock;
}
async function sendTCPMessage(sock, message) {
  return new Promise((resolve, reject) => {
    // write the message to the socket
    sock.write(message);
    
    // listen for incoming data on the socket
    sock.on('data', (data) => {
      // resolve the promise with the received data
      resolve(data);
    });
    
    // listen for errors on the socket
    sock.on('error', (error) => {
      // reject the promise with the error
      reject(error);
    });
  });
}
  
  function sendYamahaMessage(sock, message) {
    const fullMessage = message + '\n';
    return sendTCPMessage(sock, fullMessage);
  }
  
  async function getConfigProfile(ip, port, mix, channel) {
    try {
      const sock = initTCPSocket(ip,port);

      const validPrefix = ['get'];
      const validInfix = ['MIXER:Current/InCh/Label/Name',
                          'MIXER:Current/InCh/ToMix/Level',
                          'MIXER:Current/InCh/ToMix/Pan',
                          'MIXER:Current/InCh/ToMix/On'];
      const labels = ['Name', 'Level', 'Pan', 'On'];
      const types = ['str', 'int', 'int', 'bool'];
      const jsonFormat = {
        "filename": "CL5.json",
        "version": "0.1",
        "timestamp": 'temp',
        "user": "",
        "mixes": []
      };
  
      for (let i = 1; i <= mix; i++) {
        let mix_dict = {};
  
        for (let j = 1; j <= channel; j++) {
          let channel_dict = {};
  
          for (let k = 0; k < labels.length; k++) {
            const command = `${validPrefix[0]} ${validInfix[k]} ${j} ${i}`;
            const response = await sendYamahaMessage(sock, command);
  
            if (types[k] === 'str') {
              channel_dict[labels[k]] = response.toString();
            } else if (types[k] === 'int') {
              channel_dict[labels[k]] = parseInt(response);
            } else if (types[k] === 'bool' && response.toString().toLowerCase() === 'true') {
              channel_dict[labels[k]] = true;
            } else {
              channel_dict[labels[k]] = false;
            }
          }
  
          mix_dict[j.toString()] = channel_dict;
        }
  
        jsonFormat["mixes"].push({[i.toString()]: mix_dict});
      }
  
      const now = new Date();
      jsonFormat["timestamp"] = now.toString();
  
      return saveData(JSON.stringify(jsonFormat));
    } catch (err) {
      console.log(err);
    }
  }
  

export { getConfigProfile };