import { SERVER_IP } from "./dev-env.local";
import { Environment } from "./types";

export const environment: Environment = {
  production: true,
  apiUrl: `http://${SERVER_IP}:6022/api/`,
};
