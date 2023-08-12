import "./footer.css";




export const Footer = () => {
  return (
    <div style={{ width: "100%" }}>
      <footer>
        <div className="main-footer">
          <div className="main-footer-item" style={{ alignItems: "unset" }}>
            <div className="title-footer">Hightee Queen</div>
            <div className="desc-footer">
                When you care enough to send the very best
            </div>
            <div className="logo-social-network">
              <a href="https://www.facebook.com/profile.php?id=100077535672034">
                <i className="Iconfooter fab fa-facebook-square"></i>
              </a>
              <a href="https://github.com/PhuongLe222/IMGART">
                <i className="Iconfooter fab fa-whatsapp-square"></i>
              </a>
              <a href="https://mail.google.com/">
              <i className="Iconfooter fab fa-instagram-square"></i>
              </a>
            </div>
            <div className="extra-footer-item">
              Copyright 2022 ImgartStore, All right reserved.
            </div>
          </div>
          <div className="main-footer-item">
            <div className="policy-title">Marketplace</div>
            <span>Explore</span>
            <span>Hightees</span>
            <span>Collectibles</span>
            <span>Virtual Reality</span>
            <div className="extra-footer-item" style={{ visibility: "hidden" }}>
              .
            </div>
          </div>
          <div className="main-footer-item">
            <div className="policy-title">Resources</div>
            <span>Help Center</span>
            <span>Partners</span>
            <span>Blog</span>
            <span>Newsletter</span>
            <div className="extra-footer-item">Privacy Policy</div>
          </div>
          <div className="main-footer-item">
            <div className="policy-title">Company</div>
            <span>About Us</span>
            <span>Careers</span>
            <span>Support</span>
            <span>Newsletter</span>
            <div className="extra-footer-item">Terms & Conditions</div>
          </div>
        </div>
      </footer>
    </div>
  );
};