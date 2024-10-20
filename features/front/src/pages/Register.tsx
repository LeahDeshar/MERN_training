import React from "react";
import Form from "../Form/Form";

function Register() {
  return (
    <>
      <div className="row g-0">
        <div className="col-md-6 form-container">
          <Form
            formTitle={"Register"}
            submitBtn={"Register"}
            formType={"register"}
          />
        </div>
      </div>
    </>
  );
}

export default Register;
