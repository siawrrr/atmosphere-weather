import React from "react";
import {
  Sun,
  SunDim,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
} from "lucide-react";

interface WeatherIconProps {
  name: string;
  className?: string;
}

export function WeatherIcon({ name, className = "w-6 h-6" }: WeatherIconProps) {
  switch (name) {
    case "Sun":
      return <Sun className={className} />;
    case "SunDim":
      return <SunDim className={className} />;
    case "CloudSun":
      return <CloudSun className={className} />;
    case "CloudFog":
      return <CloudFog className={className} />;
    case "CloudDrizzle":
      return <CloudDrizzle className={className} />;
    case "CloudRain":
      return <CloudRain className={className} />;
    case "CloudSnow":
      return <CloudSnow className={className} />;
    case "CloudLightning":
      return <CloudLightning className={className} />;
    case "Cloud":
    default:
      return <Cloud className={className} />;
  }
}