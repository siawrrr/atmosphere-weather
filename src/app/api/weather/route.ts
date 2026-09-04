import { NextRequest, NextResponse } from "next/server";
import { ProcessedWeatherData } from "@/types/weather";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");
    let lat = searchParams.get("lat");
    let lon = searchParams.get("lon");
    let locationName = "Unknown Location";
    let country = "";

    // Geocoding step if city search query is provided
    if (query) {
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        query
      )}&count=1&language=en&format=json`;
      const geoRes = await fetch(geoUrl);
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        return NextResponse.json({ error: "Location not found" }, { status: 404 });
      }

      const match = geoData.results[0];
      lat = match.latitude.toString();
      lon = match.longitude.toString();
      locationName = match.name;
      country = match.country || "";
    }

    // Default fallback coordinates if none provided
    if (!lat || !lon) {
      lat = "35.6895";
      lon = "139.6917";
      locationName = "Tokyo";
      country = "Japan";
    }

    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,precipitation_probability,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=auto`;

    const weatherRes = await fetch(weatherUrl, { next: { revalidate: 300 } });
    if (!weatherRes.ok) {
      return NextResponse.json({ error: "Failed to fetch weather forecast" }, { status: 502 });
    }

    const data = await weatherRes.json();

    // Slice the next 24 hours starting from current local hour
    const nowHour = new Date().getHours();
    const hourly = data.hourly.time.slice(nowHour, nowHour + 24).map((timeStr: string, idx: number) => ({
      time: timeStr,
      temperature: Math.round(data.hourly.temperature_2m[nowHour + idx]),
      weatherCode: data.hourly.weather_code[nowHour + idx],
      precipitationProbability: data.hourly.precipitation_probability[nowHour + idx] ?? 0,
    }));

    // Format the 7-day outlook
    const daily = data.daily.time.map((dateStr: string, idx: number) => ({
      date: dateStr,
      weatherCode: data.daily.weather_code[idx],
      temperatureMax: Math.round(data.daily.temperature_2m_max[idx]),
      temperatureMin: Math.round(data.daily.temperature_2m_min[idx]),
      sunrise: data.daily.sunrise[idx],
      sunset: data.daily.sunset[idx],
      uvIndexMax: data.daily.uv_index_max[idx],
    }));

    const responsePayload: ProcessedWeatherData = {
      location: {
        name: locationName,
        country,
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
      },
      current: {
        temperature: Math.round(data.current.temperature_2m),
        apparentTemperature: Math.round(data.current.apparent_temperature),
        relativeHumidity: data.current.relative_humidity_2m,
        weatherCode: data.current.weather_code,
        windSpeed: Math.round(data.current.wind_speed_10m),
        windDirection: data.current.wind_direction_10m,
        surfacePressure: Math.round(data.current.surface_pressure),
        uvIndex: daily[0]?.uvIndexMax ?? 0,
        isDay: data.current.is_day,
      },
      hourly,
      daily,
    };

    return NextResponse.json(responsePayload);
  } catch {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}