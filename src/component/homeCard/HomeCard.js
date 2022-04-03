import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './HomeCard.css';
import { getUserForms } from "../../apiCall";
const IMG = require('../../assets/form-untitled.png');

export const HomeCard = () => {

    const navigate = useNavigate();
    const [myForms, setMyForms] = useState([]);

    useEffect(async() => {
        const forms = await getUserForms();
        console.log(forms.data)
        if (forms.data.status) {
            setMyForms(forms.data.forms);
        }
    }, [])

    return (
        <div className="form-bar-container">
            <div className="container">
                <div className="row row-cols-1">
                    <div className="col form-card-container">
                        <div>New</div>
                        <div className="row" style={{ padding: '10px'}} >
                            <div className="col new-card-container" onClick={() => navigate('create')} >
                            <svg xmlns="http://www.w3.org/2000/svg" style={{border: '1px solid #ffffff', backgroundColor: '#ffffff', cursor: 'pointer'}} viewBox="0 0 448 512" width="144" height="84" fill="#03787C"><path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z"/></svg>
                                <div style={{marginLeft: '15px'}}>New Form</div>
                            </div>
                            <div className="col new-card-container">
                                <img src="https://binaries.templates.cdn.office.net/support/templates/en-us/mw11430407.png" alt="" width="180" height="150" onClick={() => navigate('create/template/customer-feedback-survey')} />
                                <div>Customer feedback survey</div>
                            </div>
                            <div className="col new-card-container">
                                <img src="https://binaries.templates.cdn.office.net/support/templates/en-us/mw11998125.png" alt="" width="180" height="150" onClick={() => navigate('create/template/event-registration')} />
                                <div>Event registration</div>
                            </div>
                            <div className="col new-card-container">
                                <img src="https://binaries.templates.cdn.office.net/support/templates/en-us/mw01004091.png" alt="" width="180" height="150" onClick={() => navigate('create/template/course-evaluation-survey')} />
                                <div>Course evaluation survey</div>
                            </div>
                            
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                    <div className="col form-card-container1">
                        <div className="row">
                        <div className="col-1" style={{borderBottom: '2px solid #03787C'}}>Recent</div>
                        </div>
                        <div className="row recent-card">
                            {myForms.map(item =>
                            <div className="col">
                                <img src={IMG} alt="" width="180" height="150" onClick={() => navigate("edit/" + item._id)}/>
                                <div>{item.heading.question ? item.heading.question : "Untitled Form"}</div>
                            </div>
                            )}
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            
        </div>
        
    )
}
