// import viteLogo from '/vite.svg'
import "./App.css";
import { HomePage } from "./layouts/HomePage/HomePage";
import { Footer } from "./layouts/NavbarAndFooter/Footer";
import { Navebar } from "./layouts/NavbarAndFooter/Navebar";

export const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navebar />
      <div className="flex-grow-1">
      <HomePage />
      </div>
      <Footer/>
    </div>
  );
};

export default App;
