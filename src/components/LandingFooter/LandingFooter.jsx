import { Link } from "react-router-dom";
import "./LandingFooter.scss";

export default function LandingFooter() {
  return (
    <footer className="landingfooter">
      <Link>login</Link>
      <Link>register</Link>
    </footer>
  );
}
