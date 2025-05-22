import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import Aside from "./Aside";
import { Outlet } from "react-router-dom";
import { CustomSidebar } from "./CustomSidebar";

const Layout = () => {
    return (
        <SidebarProvider>
            <CustomSidebar />
            <SidebarInset>
                <div className="flex min-h-screen">
                    <SidebarTrigger />
                    {/* <Aside /> */}
                    <main className="flex-1 p-6 bg-background">
                        <Outlet />
                    </main>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default Layout;
