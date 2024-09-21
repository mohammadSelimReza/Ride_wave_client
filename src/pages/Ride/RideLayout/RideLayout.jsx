import { Outlet } from "react-router-dom";
import Footer from "../../Shared/Footer/Footer";
import Header2 from "../../Shared/Header/Header2";

const RideLayout = () => {
    return (
        <div>
            <Header2></Header2>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RideLayout;