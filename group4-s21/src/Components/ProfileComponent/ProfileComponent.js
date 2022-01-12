/*author: Anjali Chaudhary */
import React from 'react'
import './RegistrationForm.css';


export const ProfileComponent = ({ formData }) => {
    return (
        <section class="profile body-pro ">
            <header class="header">
                <div class="details">
                    <h1 class="heading">Anjali Chaudhary</h1>
                    <div class="location">
                        <p>anjali@gmail.com</p>
                    </div>
                    <div class="stats">
                        <div class="col-4">
                            <p>Institution : Dalhousie University</p>
                        </div>
                        <div class="col-4">
                            <p>Degree : MACS Student</p>
                        </div>
                        <div class="col-4">
                            <p>Course : Web Tutorial - 3</p>
                        </div>
                    </div>
                </div>
            </header>
        </section>
    );
}

export default ProfileComponent;