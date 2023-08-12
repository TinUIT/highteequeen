import "./AboutUs.css";
import Header from "../../components/header/header";
import aboutUsImage from "../../assets/aboutus.png";
import { Footer } from "../../components/footer/footer";

const AboutUs = () => {
  return (
    <>
      <Header />
      <div className="container-aboutus">
        <p className="aboutus-desc">
          When beauty becomes a daily habit amidst the hustle and bustle of
          life, women need products that are convenient, have many functions,
          can be used flexibly and save time. Hightee Queen was born to meet
          that need.
        </p>
        <div className="aboutus-development">
          <img className="aboutus-img" src={aboutUsImage} alt="aboutus-image" />
          <div className="aboutus-content">
            <h3 className="aboutus-title">DEVELOPMENT</h3>
            <p className="aboutus-content-desc">
              Hightee Queen is a company born in 2022 in Vietnam - the 1st most
              populous company in Vietnam. This is also one of the giant
              factories specializing in the production of cosmetics for famous
              brands. <br></br> <br></br>There is no representative face, no
              K-Pop idol to promote... Hightee Queen has gradually conquered the
              land of Rice because of its quality and new breakthrough in each
              product. By 2023, Hightee Queen really became a favorite brand in
              VietNam.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;