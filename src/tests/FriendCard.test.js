import React from "react";
import { render } from "@testing-library/react";
import FriendCard from "../components/friendCard/FriendCard";
import ProfileA from "../assets/friends/friend_profile_A.png";

test("render friend card", () => {
    const { getByText } = render(<FriendCard
        friendImage={ProfileA}
        friendName="María Rodríguez"
        friendUsername="marRo"
    />);
    const friend1 = getByText('María Rodríguez');
    expect(friend1).toBeInTheDocument();
});