import { Link } from "react-router-dom";
import "./Footer.scss";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <Link className="footer__link">contact us</Link>
        <Link className="footer__link">register</Link>
        <Link className="footer__link">login</Link>
      </div>
    </footer>
  );
}
