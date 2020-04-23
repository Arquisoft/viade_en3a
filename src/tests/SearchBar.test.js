import '@testing-library/jest-dom/extend-expect';
import assert from 'assert';
import EditableMap from "../components/editableMap/EditableMap";
import { render } from "@testing-library/react";
import React from "react";
import SearchBar from "../components/routeCreation/SearchBar";

test('Test map search feature', async () => {
    render(<SearchBar map={<EditableMap />} />);

    document.getElementById("txtSearch").innerText = "Mieres";
    document.getElementById("btnSearch").click();

    let value = document.getElementById("txtSearch").innerText;
    assert.equal(value, "Mieres");

    document.getElementById("txtSearch").innerText = "";
    document.getElementById("btnSearch").click();

    value = document.getElementById("txtSearch").innerText;
    assert.equal(value, "");
});



