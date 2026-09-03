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

  if (body instanceof FormData) {

    options.body = body;

  } else if (body && typeof body === "object") {

    options.body = new URLSearchParams(
      body as Record<string, string>
    );

  } else if (body) {

    options.body = body;

  }

  const response = await fetch(
    requestUrl,
    options
  );

  const contentType = response.headers.get("content-type");

  const responseText = await response.text();

  if (!response.ok) {

    throw new Error(
      `API ERROR | URL: ${requestUrl} | STATUS: ${response.status} | CONTENT-TYPE: ${contentType} | RESPONSE: ${responseText.substring(0, 500)}`
    );
  }

  try {

    return JSON.parse(responseText);

  } catch (error) {

    throw new Error(
      `API JSON ERROR | URL: ${requestUrl} | STATUS: ${response.status} | CONTENT-TYPE: ${contentType} | RESPONSE: ${responseText.substring(0, 500)}`
    );
  }
}