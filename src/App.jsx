import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

export default () => {
    const [advice, setAdvice] = useState({
        advice: "",
        isFetching: false, // Removed initial fetching state
    });

    useEffect(() => {
        fetchAdvice();
    }, []);

    const fetchAdvice = () => {
        setAdvice((prevState) => ({ ...prevState, isFetching: true }));
        axios
            .get("https://api.adviceslip.com/advice")
            .then((res) => {
                const { advice } = res.data.slip;
                setAdvice({ advice: advice, isFetching: false });
            })
            .catch((error) => {
                console.log("Error occurred", error);
                setAdvice((prevState) => ({ ...prevState, isFetching: false }));
            });
    };

    const rawAdvice = advice.advice.slice(0, -1);

    return (
        <div className="app">
            <div className={`card ${advice.isFetching ? "fetching" : ""}`}>
                <h1 className="heading"><span>' </span>{rawAdvice}<span> '</span></h1>
                <button onClick={fetchAdvice} className="button">
                    <span>Generate!</span>
                </button>
            </div>
        </div>
    );
};
