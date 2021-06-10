// APP (client)
// Int. Console
// {data: ip}

// Server (workers)

// Ext. Console

import template from './template' // html

let count = 10
let clients = []

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleSession(websocket) {
  clients.push(websocket.accept())
  console.log(clients)
  websocket.addEventListener('message', async ({ data }) => {
    if (data === 'CLICK') {
      console.log(data)
      count += 1
      websocket.send(JSON.stringify({ count, tz: new Date() }))
    } else if (data === 'TEST') {
      console.log(data)
      console.log(clients)
      websocket.send(JSON.stringify({ count, clients, tz: new Date() }))
      count += 1
      clients.forEach(client => {
        client.send(JSON.stringify({ count, clients, tz: new Date() }))
        // client.send(message.utf8Data);
      })
    } else {
      // An unknown message came into the server. Send back an error message
      websocket.send(
        JSON.stringify({ error: 'Unknown message received', tz: new Date() }),
      )
    }
  })

  websocket.addEventListener('close', async evt => {
    // Handle when a client closes the WebSocket connection
    console.log(evt)
  })
}

const websocketHandler = async request => {
  const upgradeHeader = request.headers.get('Upgrade')
  const url = new URL(request.url)
  if (upgradeHeader !== 'websocket') {
    // return new Response('Expected websocket', { status: 400 })
    return new Response(url.pathname.toString(), { status: 400 })
  }

  const [client, server] = Object.values(new WebSocketPair())
  await handleSession(server)

  return new Response(null, {
    status: 101,
    webSocket: client,
  })
}

async function handleRequest(request) {
  try {
    const url = new URL(request.url)
    switch (url.pathname) {
      case '/':
        return template()
      case '/wsconsole':
        return websocketHandler(request)
      default:
        return new Response("Bad request. Don't try again.", { status: 400 })
    }
  } catch (err) {
    return new Response(err.toString())
  }
}
