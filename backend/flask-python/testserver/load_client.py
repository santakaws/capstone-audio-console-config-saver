import socket
import json
import time

HOST = "127.0.0.1"  # The server's hostname or IP address
PORT = 5002  # The port used by the server

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    f = open('dummy.json', 'r')
    load_data = json.load(f)
    command_list = []
    for mix in load_data['mixes'][0]:
        for channel in load_data['mixes'][0][mix]:
            command_list.append(f"set MIXER:Current/InCh/Label/Name {mix} {channel} {load_data['mixes'][0][mix][channel]['Name']}")
            command_list.append(f"set MIXER:Current/InCh/ToMix/Level {mix} {channel} {load_data['mixes'][0][mix][channel]['Level']}")
            command_list.append(f"set MIXER:Current/InCh/ToMix/Pan {mix} {channel} {load_data['mixes'][0][mix][channel]['Pan']}")
            command_list.append(f"set MIXER:Current/InCh/ToMix/On {mix} {channel} {int(load_data['mixes'][0][mix][channel]['On'])}")
    s.connect((HOST, PORT))
    for cmd in command_list:
        s.sendall(str.encode(cmd))
        data = s.recv(1024)
        print(f"Received {data!r}")
    s.close()
        
    