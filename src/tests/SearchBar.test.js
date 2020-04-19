import '@testing-library/jest-dom/extend-expect';
import assert from 'assert';
import EditableMap from "../components/editableMap/EditableMap";
import {render} from "@testing-library/react";
import React from "react";
import SearchBar from "../components/searchBar/SearchBar";

test('Test map search feature',  async () => {
    render(<SearchBar map={<EditableMap/>} />);

    document.getElementById("txtSearch").innerText="Mieres";
    document.getElementById("btnSearch").click();

    document.getElementById("txtSearch").innerText="";
    document.getElementById("btnSearch").click();

    let value = document.getElementById("destination").innerText;
    assert.equal(value,"searching...");
    
});



