const API_URL = import.meta.env.API_URL;
const API_KEY = import.meta.env.API_KEY;

export async function api(
  endpoint: string,
  method: string = "GET",
  body?: BodyInit | Record<string, any>
) {

  const requestUrl = `${API_URL}${endpoint}`;

  const options: RequestInit = {
    method,
    headers: {
      "X-API-KEY": API_KEY
    }
  };

  // Si enviamos un FormData, lo usamos directamente
  if (body instanceof FormData) {

    options.body = body;

  // Si es un objeto, lo convertimos en URLSearchParams
  } else if (body && typeof body === "object") {

    options.body = new URLSearchParams(
      body as Record<string, string>
    );

  // Si ya viene preparado (string, etc.)
  } else if (body) {

    options.body = body;

  }

  console.log("================================");
  console.log("API REQUEST URL:", requestUrl);
  console.log("API REQUEST METHOD:", method);
  console.log("API KEY PRESENT:", !!API_KEY);
  console.log("================================");

  const response = await fetch(
    requestUrl,
    options
  );

  const contentType = response.headers.get("content-type");

  console.log("================================");
  console.log("API RESPONSE STATUS:", response.status);
  console.log("API RESPONSE CONTENT-TYPE:", contentType);
  console.log("API RESPONSE URL:", response.url);
  console.log("================================");

  const responseText = await response.text();

  console.log("================================");
  console.log(
    "API RESPONSE BODY:",
    responseText.substring(0, 500)
  );
  console.log("================================");

  if (!response.ok) {

    throw new Error(
      `Error ${response.status}: ${response.statusText}`
    );
  }

  try {

    return JSON.parse(responseText);

  } catch (error) {

    console.log("================================");
    console.log("API JSON PARSE ERROR");
    console.log("REQUEST URL:", requestUrl);
    console.log("CONTENT-TYPE:", contentType);
    console.log(
      "RESPONSE START:",
      responseText.substring(0, 500)
    );
    console.log("================================");

    throw error;
  }
}