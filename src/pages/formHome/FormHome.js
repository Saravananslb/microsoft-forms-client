import React, { useEffect, useState } from "react";
import './FormHome.css';
import { Header } from "../../component/header/Header";
import { HomeCard } from "../../component/homeCard/HomeCard";
import { getUserEmail } from "../../apiCall";
import { useParams } from "react-router-dom";

export const FormHome = () => {

    const [mails, setMails] = useState([]);

    const { type, selectedMail } = useParams();

    return (
        <>
            <Header/>
            <HomeCard />
            <div className="mail-container">
                <div className="mail-list-show">
                    
                </div>
            </div>   
        </>
    )
}