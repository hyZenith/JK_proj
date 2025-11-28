import React from "react";
import "./LoginModal.scss";

export default class LoginModal extends React.Component {


    render() {
        return <div className="modal">
            <div className="login-modal">
                <div className="logo">
                    <a href="/"><img loading="lazy" src="/assets/logo.png" alt="app logo" /></a>
                </div>
                <h1 className="form-title">{this.props.message ?? "You must login in order to perform this action"}</h1>

                <a class='login' href="/auth/login">Login</a>
                <a class='register' href="/auth/register">Become a member</a>
            </div>
        </div>
    }
}