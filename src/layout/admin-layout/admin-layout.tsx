import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../component/school-admin/ui/breadcrumb";
import { Separator } from "../../component/school-admin/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../component/school-admin/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import Sidebar from "../../component/school-admin/shared/sidebar";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../component/school-admin/ui/avatar";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("addAdmin"); // Track active tab
  const [profile, setProfile] = useState<{
    Phone: string;
    Email: string;
    UserName: string;
    Image: string | null;
  }>({
    Phone: "",
    Email: "",
    UserName: "",
    Image: null,
  });
  const route = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth > 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    route("/");
    localStorage.removeItem("token");
  };

  return (
    <>
      <p>admiiiiiiiiiiiiiiiiiin</p>
      <header
        className={`flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <div className="flex items-center">
          {/* <p onClick={toggleSidebar}>Logo</p> */}
          <button
            className="text-white text-right mb-0 bg-[#523397] rounded-sm p-1"
            onClick={toggleSidebar}
          >
            <ArrowLeft
              className={`h-5 w-5 ${
                isSidebarOpen
                  ? ""
                  : "origin-center rotate-180 ease-in duration-300"
              }`}
            />
          </button>
          <Separator orientation="vertical" className="mr-2 ml-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Our Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Current Page</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src={`/${profile.Image}`} alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={10}>
            <DropdownMenuItem onClick={() => route("/dashboard/profile")}>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <div className="flex">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <main
          className={`flex flex-1 flex-col gap-4 p-4 transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-0"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
