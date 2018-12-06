//Net Code

//Have a listen service here if server
function listen() {
  //sockets listen
  console.log('Recieving Packet:');
}

//Have a sending service here if client
function send() {
  //sockets send
  console.log('Sending Packet:');
}

//List of things to sync in order of priority
//player array
//platform array
//controls/input state
//projectile array
//boss position
//window size

//If player is a client, the local arrays will be ignored or be overwritten and instead by used
//by those coming through the network as the packets come through

//Game runs at 60 fps so theoretically the updates will need to sync every 16.7ms, should be fine for
//LAN connections, unsure how this will behave under connections with higher latency

//Should eventually create a notification/network status for the client to let know when a client/server connects
//can use console in the meantime
