import { createContext, useContext } from "react";
import { useKeycloak } from "./keycloak";
import { KeycloakConfig } from "keycloak-js";

interface AuthContextType {
    auth: boolean;
    doLogOut: () => void;
}

export type AuthProviderType = {
    children: JSX.Element;
};

const tnexKeycloakConfig: KeycloakConfig = {
    url: "https://nxc-idm.fccom.com.vn/auth",
    realm: "test-collection",
    clientId: "app-nova",
};

export const AuthContext = createContext<AuthContextType>({
    auth: false,
    doLogOut: () => {},
});

export const useAuth = () => {
    const auth = useContext(AuthContext);

    if (!auth) {
        throw new Error(
            "Auth: `useAuth` hook must be wrapped within a `AuthProvider` component"
        );
    }

    return { auth };
};

export const AuthProvider = ({ children }: AuthProviderType) => {
    const { auth, doLogOut } = useKeycloak({ config: tnexKeycloakConfig });

    if (auth) {
        return (
            <AuthContext.Provider value={{ auth, doLogOut }}>
                {children}
            </AuthContext.Provider>
        );
    }
};
