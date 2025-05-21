import Aside from "./Aside";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <div className="flex min-h-screen">
            <Aside />
            <main className="flex-1 p-6 bg-background">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
