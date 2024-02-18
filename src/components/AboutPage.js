import React from "react";
import text1 from "../assets/text1.png"
import text2 from "../assets/text2.png"
import text3 from "../assets/text3.png"
import bear from "../assets/bear.png"
import login from "../assets/login.png"
import signup from "../assets/signup.png"

export default function AboutPage() {
    return <div className="flex justify-around flex-wrap place-items-center gap-4">
        <div className="w-1/2 pt-4 max-w-96">
            <img src={text1} alt="text1" />
            <img src={text2} alt="text2" />
        </div>
        <div className="p-8">
            <div className="flex flex-col max-w-80">
                <img className="w-32" src={bear} alt="bear" />
                <a className="place-self-center" href="https://example.com">
                    <img className="w-80" src={login} alt="login" />
                </a>
                <img className="w-96 place-self-center" src={text3} alt="text3" />
                <a className="place-self-center" href="https://example.com">
                    <img className="w-80" src={signup} alt="signup" />
                </a>
            </div>
        </div>
    </div>
}