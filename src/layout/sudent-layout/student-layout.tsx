import { Outlet } from "react-router-dom";
import Footer from "../footer";
import Header from "../header";

const StudentLayout = () => {
  return (
    <div className="min-h-[100vh] flex flex-col ">
      <Header />
      <main className="flex-1 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default StudentLayout;
