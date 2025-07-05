const fetch = require("node-fetch");

exports.handler = async function (event) {
  const path = event.path.replace("/.netlify/functions/proxy", "");
  const url = `https://app.circle.so${path}`;

  try {
    const response = await fetch(url, {
      method: event.httpMethod,
      headers: {
        Authorization: "Bearer 3gwcS6kzZRvdzfHAvL4MeaFqEZWcZTNZ",
        "Content-Type": "application/json"
      },
      body: event.httpMethod !== "GET" && event.body ? event.body : undefined
    });

    const data = await response.text();

    return {
      statusCode: response.status,
      body: data,
      headers: {
        "Content-Type": "application/json"
      }
    };
  } catch (err) {
    console.error("❌ ERRO INTERNO:", err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
