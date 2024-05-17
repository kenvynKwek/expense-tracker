Bun.serve({
    // port: 8080, // defaults to $BUN_PORT, $PORT, $NODE_PORT otherwise 3000
    // hostname: "mydomain.com", // defaults to "0.0.0.0"
    fetch(req) {
      return new Response("Hello from bun server");
    },
  });
console.log("server running");