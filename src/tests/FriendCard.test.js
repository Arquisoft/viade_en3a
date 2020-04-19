import React from "react";
import { render } from "@testing-library/react";
import RouteManager from "./../model/RouteManager";
import RouteList from "../components/routeList/RouteList";
import FriendCard from "../components/friendCard/FriendCard";
import ProfileA from "../assets/friends/friend_profile_A.png";

const routeManager = new RouteManager();

test("render friend card", () => {
    const { getByText } = render(<FriendCard
        friendImage={ProfileA}
        friendName="María Rodríguez"
        friendUsername="marRo"
    />);
    const friend1 = getByText('María Rodríguez');
    expect(friend1).toBeInTheDocument();
});