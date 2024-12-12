import config from "./config";

export function getMyUrl() {
  if (process.env.NODE_ENV === "development") {
    return config.development.SiteUrl;
  } else if (process.env.NODE_ENV === "production") {
    return config.production.SiteUrl;
  } else if (process.env.NODE_ENV === "local"){
    return config.local.SiteUrl;
  } else {
    throw new Error("Unknown environment");
  }
}

export function getMyAPIUrl() {
  if (process.env.NODE_ENV === "development") {
    return config.development.APIUrl;
  } else if (process.env.NODE_ENV === "production") {
    return config.production.APIUrl;
  } else if (process.env.NODE_ENV === "local"){
    return config.local.APIUrl;
  } else {
    throw new Error("Unknown environment");
  }
}
