import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const onDecorContainerClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const onLogoContainerClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onButtClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  return (
    <div className="register">
      <div className="decor3" onClick={onDecorContainerClick}>
        <img className="image-9-icon3" alt="" src="/image-91@2x.png" />
        <img className="image-10-icon3" alt="" src="/image-10@2x.png" />
      </div>
      <div className="logo4" onClick={onLogoContainerClick}>
        <div className="kidtube5">Kidtube</div>
        <img className="logo-child1" alt="" src="/group-2444.svg" />
      </div>
      <div className="reg">
        <div className="confirm">
          <input
            className="and-confirm-it"
            placeholder="... And confirm it !"
            type="password"
          />
        </div>
        <div className="password1">
          <input
            className="pass2"
            placeholder="Type your password here ..."
            type="password"
          />
        </div>
        <div className="email2">
          <input
            className="lets-us-know"
            placeholder="Let’s us know your email ^_^"
            type="email"
          />
        </div>
        <div className="name2">
          <input
            className="what-is-your"
            placeholder="What is your kid’s name ?"
            type="text"
          />
        </div>
        <button className="butt1" onClick={onButtClick}>
          <div className="button7">Start!</div>
        </button>
      </div>
    </div>
  );
};

export default Register;
