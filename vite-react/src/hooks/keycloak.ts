import Keycloak, { KeycloakConfig, KeycloakInitOptions } from "keycloak-js";
import { useEffect, useState } from "react";

const keycloakInitOptions: KeycloakInitOptions = {
    onLoad: "login-required",
    checkLoginIframe: false,
};

const keycloakLogOut = (clientId: string, refreshToken: string) => {
    const option = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "POST",
        body: new URLSearchParams({
            client_id: clientId,
            refresh_token: refreshToken,
        }),
    };
    return fetch(
        `https://nxc-idm.fccom.com.vn/auth/realms/test-collection/protocol/openid-connect/logout`,
        option
    );
};

export const useKeycloak = ({ config }: { config: KeycloakConfig }) => {
    const [auth, setAuth] = useState<boolean>(false);

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            initKeycloak();
        } else {
            setAuth(true);
        }
    }, []);

    const initKeycloak = () => {
        const keycloakInstance = new Keycloak(config);
        keycloakInstance.init(keycloakInitOptions).then((auth) => {
            if (auth) {
                localStorage.setItem(
                    "token",
                    JSON.stringify({
                        token: keycloakInstance.token,
                        refreshToken: keycloakInstance.refreshToken,
                    })
                );
                setAuth(true);
            } else {
                setAuth(false);
            }
        });
    };

    const doLogOut = () => {
        keycloakLogOut(
            "app-nova",
            JSON.parse(localStorage.getItem("token") || "").refreshToken
        )
            .then(() => {
                localStorage.removeItem("token");
                setAuth(false);
                location.reload();
            })
            .catch((err) => console.log(err));
    };

    return { auth, doLogOut };
};
