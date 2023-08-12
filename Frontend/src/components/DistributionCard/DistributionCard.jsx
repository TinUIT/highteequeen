import "./DistributionCard.css";

export const DistributionCard = ({ src, title, link }) => {
  return (
    <div className="wrap-distribution-card">
      <div className="channel-img">
        <img className="img" src={src} alt="image-channel"></img>
      </div>
      <h5 className="channel-title">{title}</h5>
      <a href={link} className="detail-btn">
        Detail
      </a>
    </div>
  );
};