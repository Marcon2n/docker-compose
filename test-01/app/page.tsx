"use client";
import { useAuth } from "@/hooks/use-auth";

export default function Home() {
    const { doLogOut } = useAuth();
    return (
        <div className="relative">
            <div>Home</div>
            <button
                className="absolute top-2 right-2 border px-2 rounded-lg bg-red-600 text-white"
                onClick={doLogOut}
            >
                Log Out
            </button>
        </div>
    );
}
