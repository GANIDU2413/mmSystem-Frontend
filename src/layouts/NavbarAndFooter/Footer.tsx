import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <div className='footer-color'>
            <footer className='container d-flex flex-wrap 
                justify-content-between align-items-center py-2 footer-colorr'>
                <p className='col-md-4 mb-0 text-white'>© Technology Faculty MM System, Inc</p>
                <ul className='nav navbar-dark col-md-4 justify-content-end'>
                    <li className='nav-item'>
                        <Link  className='nav-link px-2 text-white' to={"/home"}>
                            Home
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link  className='nav-link px-2 text-white' to={"/search"}>
                            Feedback
                        </Link>
                    </li>
                </ul>
            </footer>
        </div>
    );
}