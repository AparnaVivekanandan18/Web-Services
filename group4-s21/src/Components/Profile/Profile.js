/*author: Anjali Chaudhary */
import React from "react";
import "./index.css";
const Profile = (props) => {
    const { userData, logout } = props;
    return (
        <div className="profile-page">
            <div className="container">
                <div className="content-wrap">
                    <h1>Welcome <span>{userData.username}</span></h1>
                    <div className="detail-wrap">
                        <div className="link-wrap">
                            <span className="link-label">Email:</span>
                            <a href={`mailto:${userData.username}@gmail.com`}>{userData.username}@gmail.com</a>
                        </div>
                        <div className="link-wrap">
                            <span className="link-label">Phone:</span>
                            <a href="tel:xxxxxxxxxx">XXXXX-XXXXX</a>
                        </div>
                    </div>
                    <span className="logout-btn" onClick={logout}>logout</span>
                </div>
            </div>

        </div>
    )
}
export default Profile;