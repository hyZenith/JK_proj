import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

export default class ClientLayout extends React.Component {

    renderHeader() {
        return <Header {...this.props}></Header>
    }

    renderFooter() {
        return <Footer {...this.props}></Footer>
    }

    render() {
        return <>
            {this.renderHeader()}
            <Outlet></Outlet>
            {this.renderFooter()}

        </>
    }
}