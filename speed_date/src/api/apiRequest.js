import { cookieService } from "../service/cookieservice";
import { api_user } from "./user";
const apiRequest = (requestFunc, ...params) => {
    if (cookieService.getExpiration() < Date.now() + 40) {
        return api_user.updateToken()
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                cookieService.setAccessToken(data.access);
                cookieService.setRefreshToken(data.refresh);
                cookieService.setExpiration(data.expiration);
                cookieService.setRole(data.roles);
                return requestFunc(...params);
            })
            .catch((error) => {
                console.error('Error refreshing token:', error);
                throw error;
            });
    } else {
        return requestFunc(...params);
    }
};

export default apiRequest;
