import { ArrowLeft, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../component/school-admin/shared/sidebar";
import { Avatar, AvatarFallback } from "../../component/school-admin/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../component/school-admin/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../component/school-admin/ui/dropdown-menu";
import { Separator } from "../../component/school-admin/ui/separator";
import { logout, selectUserName } from "../../store/authSlice";
import { AppDispatch } from "../../store/store";
import { AvatarImage } from "@radix-ui/react-avatar";
import { AvatarIcon } from "@radix-ui/react-icons";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("addAdmin"); // Track active tab

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth > 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const userName = useSelector(selectUserName);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // Redirect user after logout
  };

  return (
    <>
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
            <Avatar className="cursor-pointer ">
              <AvatarIcon className="size-full" />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={10} className="bg-white">
            {/* <DropdownMenuItem onClick={() => route("/dashboard/profile")}> */}
            <DropdownMenuLabel>{userName}</DropdownMenuLabel>
            {/* </DropdownMenuItem> */}
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
