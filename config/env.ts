import dotenv from "dotenv";
dotenv.config();

function getEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const ENV = {
  BASE_URL: getEnv("BASE_URL"),
  ACCESS_TOKEN: getEnv("ACCESS_TOKEN"),
};
