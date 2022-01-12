/*author: Anjali Chaudhary */
import React from 'react'
import './RegistrationForm.css';
import ProfileComponent from "./ProfileComponent";

export const RegistrationForm = ({ formData, setFormData }) => {

  const onChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const mySubmitHandler = (event) => {
    event.preventDefault();
    let formIsValid = true;

    if (!formData.firstName.match(/^[a-zA-Z0-9]+$/)) {
      formIsValid = false;
      alert("Only alphanumeric allowed")
    }

    if (!formData.lastName.match(/^[a-zA-Z0-9]+$/)) {
      alert("Only alphanumeric allowed")
      formIsValid = false;
    }

    if (!validateEmail(formData.email)) {
      alert("Email is not valid")
      formIsValid = false;
    }

    if (formData.password.length < 8 || formData.confirmPassword.length < 8) {
      alert("Password must have minimum 8 letters")
      formIsValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match")
      formIsValid = false;
    }

    if (formIsValid) {
      window.location.href = "/userProfile"
    }
  }

  return (
    <section class="profile body-pro">
      <form
        onSubmit={mySubmitHandler}>
        <div class="container" >
          <h1>Register</h1>
          <div class="label fnt-weight">
            <div>
              First name: <input
                name="firstName"
                type="text"
                placeholder="First name"
                required
                onChange={onChange}
              />
            </div>
            <br/>
            <div>
              Last name:<input
                name="lastName"
                type="text"
                placeholder="Last name"
                required
                onChange={onChange}
              />
            </div>
            <br/>
            <div>
              Email: <input
                name="email"
                type="email"
                placeholder="E-mail"
                required
                onChange={onChange} />
            </div>
            <br/>
            <div>
              Password: <input
                name="password"
                type="password"
                placeholder="Password"
                required
                onChange={onChange} />
            </div>
            <br/>
            <div>
              Confirm password:<input
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                required
                onChange={onChange} />
            </div>
            <br/>
            <div>
              <button primary>Register</button>
            </div>
          </div>
        </div>
      </form>
    </section >
  );
}
export default RegistrationForm;