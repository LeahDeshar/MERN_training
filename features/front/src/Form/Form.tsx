import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputType from "./InputType";
import { handleLogin, handleRegister } from "../services/authService";

function Form({ formType, submitBtn, formTitle }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  return (
    <div>
      <form
        onSubmit={(e) => {
          if (formType === "login") return handleLogin(e, email, password);
          else if (formType === "register")
            return handleRegister(e, userName, email, password);
        }}
      >
        <h1 className="text-center">{formTitle}</h1>
        <hr />

        {(() => {
          //eslint-disable-next-line
          switch (true) {
            case formType === "login": {
              return (
                <>
                  <InputType
                    labelText={"email"}
                    labelFor={"forEmail"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                    labelText={"Password"}
                    labelFor={"forPassword"}
                    inputType={"password"}
                    name={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </>
              );
            }
            case formType === "register": {
              return (
                <>
                  <InputType
                    labelText={"email"}
                    labelFor={"forEmail"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                    labelText={"Password"}
                    labelFor={"forPassword"}
                    inputType={"password"}
                    name={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputType
                    labelText={"UserName"}
                    labelFor={"forUsername"}
                    inputType={"text"}
                    name={"UserName"}
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </>
              );
            }
          }
        })()}

        <div className="d-flex flex-row justify-content-between">
          {formType === "login" ? (
            <p>
              Not registerd yet ? Register
              <Link to="/register"> Here !</Link>
            </p>
          ) : (
            <p>
              Already User Please
              <Link to="/login"> Login !</Link>
            </p>
          )}
          <button
            className="btn btn-primary"
            type="submit"
            style={{ margin: "10px 0" }}
          >
            {submitBtn}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
