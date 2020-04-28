import React from "react";
import { render, fireEvent } from "@testing-library/react";
import EditProfile from "../pages/EditProfile";
import Friends from "../pages/Friends";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import SignUp from "../pages/SignUp";
import PageNotFound from "../components/pageNotFound/PageNotFound";
import MyNavBar from "../components/navBar/navBar";
import i18n from '../i18n';

const leftClick = { button: 1 };

test("render edit profile", () => {
    const { getByText } = render(<EditProfile />);
    const title = getByText(i18n.t("editProfileTitle"));
    expect(title).toBeInTheDocument();
});

test("render friends", () => {
    const { getByText } = render(<Friends />);
    const title = getByText(i18n.t("friendsTitle"));
    expect(title).toBeInTheDocument();
    const button = document.getElementById("addBtn");
    fireEvent.click(button, leftClick);
});

test("render home", () => {
    const { getByText, findByText } = render(<Home />);
    const title = getByText(i18n.t("homeWelcome2"));
    expect(title).toBeInTheDocument();
});

test("render profile", () => {
    const { getByText } = render(<Profile />);
    const title = getByText(i18n.t("profileTitle"));
    expect(title).toBeInTheDocument();
});

test("render sign up", () => {
    render(<SignUp />);
});

test("render pagenotfound", () => {
    const { getByText, } = render(<PageNotFound />);
    const title = getByText(i18n.t("pageNotFoundHeader"));
    expect(title).toBeInTheDocument();
});

test("render navBar", () => {
    const { getByText, findByText } = render(<MyNavBar />);
    let btn = getByText(i18n.t("navBarProfile"));
    expect(btn).toBeInTheDocument();
});

