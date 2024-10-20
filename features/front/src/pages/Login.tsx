import React from "react";
import Form from "../Form/Form";

function Login() {
  return (
    <>
      <div className="row">
        <div className="col-md-6 form-container">
          <Form
            formTitle={"Login Page "}
            submitBtn={"Login"}
            formType={"login"}
          />
        </div>
      </div>
    </>
  );
}

export default Login;
