import Footer from "../../Shared/Footer/Footer";
import Header from "../../Shared/Header/Header";
// import Header from "../../Shared/Header/Header";
import About from "../About/About";
import App from "../App/App";
import Banner from "../Banner/Banner";
import Blog from "../Blog/Blog";
import Comment from "../Comment/Comment";
import Features from "../Features/Features";
import Location from "../Location/Location";
import Trusted from "../Trusted/Trusted";

const Home = () => {
  return (
    <>
      <Header></Header>
      <Banner></Banner>
      <Features></Features>
      <About></About>
      <Trusted></Trusted>
      <App></App>
      <Comment></Comment>
      <Blog></Blog>
      <Footer></Footer>
      <Location></Location>
    </>
  );
};

export default Home;
