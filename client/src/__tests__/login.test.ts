import "@testing-library/jest-dom"
import React from "react";
import {render, screen} from "@testing-library/react"
import Login from "../modules/auth/login/Login";
describe("test login component",() => {
    it("Should load login component",() => {
        render(<Login />);
        const heading = screen.getByText(/sign in/i); // Adjust text to match your component
        expect(heading).toBeInTheDocument();
    })
})