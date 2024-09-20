import Footer from "../../Shared/Footer/Footer";
import Header2 from "../../Shared/Header/Header2";
import Dashboard from "../Dashboard/Dashboard";

const DashboardLayout = () => {
    return (
        <div>
            <Header2></Header2>
            <Dashboard></Dashboard>
            <Footer></Footer>
        </div>
    );
};

export default DashboardLayout;