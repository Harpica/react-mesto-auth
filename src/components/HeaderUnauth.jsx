import { Link } from "react-router-dom";
import Logo from "./Logo";

const HeaderAnauth = ({ linkText, linkPath }) => {
	return (
		<header className='header'>
			<Logo />
			<Link to={linkPath} className='header__link'>
				{linkText}
			</Link>
		</header>
	);
};

export default HeaderAnauth;
