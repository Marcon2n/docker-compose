import "./App.css";
import { AuthProvider } from "./hooks/use-auth";

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

function App() {
    const doLogOut = () => {
        keycloakLogOut(
            "app-nova",
            JSON.parse(localStorage.getItem("token") || "").refreshToken
        )
            .then(() => {
                localStorage.removeItem("token");
                location.reload();
            })
            .catch((err) => console.log(err));
    };

    return (
        <AuthProvider>
            <div className="flex flex-col h-full">
                <div className="w-full p-2 bg-blue-900 text-white font-medium h-[60px] flex flex-row items-center justify-between">
                    <div>Header</div>
                    <button className="z-100" onClick={doLogOut}>
                        Log out
                    </button>
                </div>
                <div className="flex grow p-2 font-medium">Content</div>
                <div className="w-full p-2 bg-blue-900 text-white font-medium flex flex-row items-center">
                    Footer
                </div>
            </div>
        </AuthProvider>
    );
}

export default App;
