import "./Distribution-Channel-Page.css";
import Header from "../../components/header/header";
import channelImage1 from "../../assets/1-channel.png";
import channelImage2 from "../../assets/2-channel.png";
import channelImage3 from "../../assets/3-channel.png";
import channelImage4 from "../../assets/4-channel.png";
import channelImage5 from "../../assets/5-channel.png";
import channelImage6 from "../../assets/6-channel.png";
import React from "react";
import { Footer } from "../../components/footer/footer";
import { DistributionCard } from "../../components/DistributionCard/DistributionCard";

const data = [
  {
    src: channelImage1,
    title: "Beauty Friend",
    link: "https://beautyfriend.vn/",
  },
  {
    src: channelImage2,
    title: "Guardian",
    link: "https://www.guardian.com.vn/",
  },
  {
    src: channelImage3,
    title: "Watsons",
    link: "https://www.watsons.vn/vi/?utm_source=SE-ad-pmax&utm_medium=search&utm_campaign=SE_CV_Brand_Campaign_Watson_Ex_MConversionValue&utm_content=SE_CV_Brand_Ex_lv2_watson_142862212276_630974665150_kwd-56999306&utm_term=630974665150&gclid=Cj0KCQjwmtGjBhDhARIsAEqfDEdFsDpSBHYPw5WdycBEZBphko1V8B4FvpSU5TibycOy2cptBClUep8aAgAvEALw_wcB",
  },
  { src: channelImage4, title: "Sammi Online", link: "https://sammishop.com/" },
  {
    src: channelImage5,
    title: "Beauty Box",
    link: "https://beautybox.com.vn/",
  },
  {
    src: channelImage6,
    title: "Hello Beauty",
    link: "https://hellobeauty.club/",
  },
];

const DistributionChannelPage = () => {
  return (
    <>
      <Header></Header>
      <div className="container-distribution">
        <h3 className="distribution-title">Distribution channel</h3>
        <div className="wrap-list-distribution-card">
          {data.map((item) => (
            <DistributionCard
              src={item.src}
              title={item.title}
              link={item.link}
            ></DistributionCard>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DistributionChannelPage;