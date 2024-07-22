import React from "react";
import { Route, Routes } from "react-router-dom";
import withRouter from './hooks/withRouter';
import { Home } from "./pages/Home/Home";
import { ContactUs } from "./pages/Contact";
import { About } from "./pages/About";
import { A1 } from "./pages/a1/A1";
import { Socialicons } from "./components/socialicons";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const AnimatedRoutes = withRouter(({ location }) => (
    <TransitionGroup>
        <CSSTransition
            key={location.key}
            timeout={{
                enter: 400,
                exit: 400,
            }}
            classNames="page"
            unmountOnExit
        >
            <Routes location={location}>
                <Route exact path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                {/* <Route path="/portfolio" element={<Portfolio />} /> */}
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/a1" element={<A1 />} />
                <Route path="*" element={<Home />} />
            </Routes>
        </CSSTransition>
    </TransitionGroup>
));

function AppRoutes() {
    return (
        <div className="s_c">
            <AnimatedRoutes />
            <Socialicons />
        </div>
    );
}

export default AppRoutes;
