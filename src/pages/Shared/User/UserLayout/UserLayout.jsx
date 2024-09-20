import { Outlet } from "react-router-dom";
import Footer from "../../Footer/Footer";
import Header3 from "../../Header/Header3";
// import Login from "../Login/Login";

const UserLayout = () => {
    return (
        <div>
            <Header3></Header3>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default UserLayout;