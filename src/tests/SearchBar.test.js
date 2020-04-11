import '@testing-library/jest-dom/extend-expect';
import assert from 'assert';
import EditableMap from "../components/editableMap/EditableMap";
import {render, wait} from "@testing-library/react";
import React from "react";
import SearchBar from "../components/searchBar/SearchBar";

test('Test map search feature',  async() => {
    const { getByText } = render(<SearchBar map={<EditableMap/>} />);

    document.getElementById("btnSearch").click();

    let value = document.getElementById("destination").innerText;
    assert.equal(value,"searching...");

     sleep(5000).then(() =>{
        let value2 = document.getElementById("destination").innerText;
        assert.equal(value,"Not found. Search for another place");
    });
    document.getElementById("txtSearch").innerText="Mieres";
    document.getElementById("btnSearch").click();

     sleep(5000).then(() =>{
        let value2 = document.getElementById("destination").innerText;
        assert.equal(value,"Mieres, Asturias, España");
    });

});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}