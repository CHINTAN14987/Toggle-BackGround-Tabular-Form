import { Button, Checkbox, Form, Input, notification, Select } from "antd";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./form.css";
import { useDispatch, useSelector } from "react-redux";
import { addDetails, editFormItem, isFormValidated } from "../../redux/reducer";
import { darkBG, lightBG } from "../../util/config";


 export default (props) => {
  const { value, closeModal } = props;
  const [formValue, setFormValue] = useState({
    Name: value ? value.Name : "",
    Email: value ? value.Email : "",
    Gender: value ? value.Gender : "",
    Age: value ? value.Age : null,
    Phone: value ? value.Phone : null,
    Address: value ? value.Address : "",
    Domain: value ? value.Domain : null,
    Percentage: value ? value.Percentage : null,
    id: value ? value.id : Math.floor(Math.random() * 1000),
  });

  const dispatch = useDispatch();
  const backGround = useSelector((state) => state.app.bgColor);
  const validation = useSelector((state) => state.app.isValidated);
  const location=useLocation()
  const genderType = ["Male", "Female"];
  const changeHandler = (event, name) => {
    if (event?.target?.value || event) {
      dispatch(isFormValidated(false));
    }
    setFormValue({ ...formValue, [name]: event });
  };

  const checkBoxChangeEvent = (event, type, name) => {
    if (event?.target?.checked) {
      dispatch(isFormValidated(false));
    }
    event.target.checked
      ? setFormValue({ ...formValue, [type]: name })
      : setFormValue({ ...formValue, [type]: null });
  };

  const editHandler = () => {
    dispatch(editFormItem({ data: formValue }));
    closeModal();
  };
  const submitHandler = () => {
    if (
      !formValue.Address ||
      !formValue.Name ||
      !formValue.Domain ||
      (!formValue.Age && !formValue.Age < 21) ||
      !formValue.Email ||
      !formValue.Gender
    ) {
      dispatch(isFormValidated(true));
      return;
    }
    dispatch(addDetails({ data: formValue }));
    notification.success({
      description: (
        <h3 style={{ color: "#1677ff", fontWeight: "700", fontSize: "20px" }}>
          Details updated sucessfully
        </h3>
      ),
    });
    setFormValue({
      Name: "",
      Email: "",
      Gender: "",
      Age: null,
      Phone: "",
      Address: "",
      Domain: null,
      Percentage: null,
    });
  };

  const typeChecking = (type) => {
    switch (type) {
      case "Gender":
        return "checkbox";
      case "Age" || "Percentage" || "Phone":
        return "number";
      case "Email":
        return "email";
      default:
        return null;
    }
  };
  const displayValidationError = (param) => {
    return (
      <span
        style={{
          color: backGround ? "#fff" : "darkred",
          fontSize: "12px",
          fontWeight: 700,
        }}
      >
        {param} Field is missing
      </span>
    );
  };
  const options = [
    {
      value: "Computer Science",
      label: "Computer Science",
    },
    {
      value: "Electronics",
      label: "Electronics",
    },
    {
      value: "Commerce",
      label: "Commerce",
    },
    {
      value: "Humanities",
      label: "Humanities",
    },
  ];

  return (
    <div className="form_container" style={backGround ? darkBG : lightBG}>
      <Form className={location.pathname==="/" ? "form_wrapper" :"modal_form"} style={backGround ? darkBG : lightBG}>
        {Object.keys(formValue)?.map((item) => {
          switch (item) {
            case "Domain":
              return (
                <div
                  className={item}
                  id={backGround ? "darkBgSelect" : "lightBgSelect"}
                >
                  <Select
                    value={formValue[item]}
                    name={item}
                    allowClear
                    placeholder="Domain"
                    onChange={(e) => {
                      changeHandler(e, item);
                    }}
                    size={"large"}
                    options={options}
                  />
                  {!formValue[item] &&
                    validation &&
                    displayValidationError(item)}
                </div>
              );
            case "Gender":
              return (
                <>
                  <div className={item}>
                    {genderType.map((gender) => {
                      return (
                        <div key={gender}>
                          <div>
                            <label
                              style={{
                                color: backGround ? "#fff" : "#ff4d4f",
                              }}
                            >
                              {gender}
                            </label>
                            <Checkbox
                              type={typeChecking(item)}
                              checked={gender === formValue[item]}
                              onChange={(e) => {
                                checkBoxChangeEvent(e, item, gender);
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {!formValue[item] &&
                    validation &&
                    displayValidationError(item)}
                </>
              );

            default:
              return (
                <div className={` item_wrapper ${item}`}>
                  <label
                    style={{
                      color: backGround ? "#fff" : "#ff4d4f",
                    }}
                  >
                    {item}
                  </label>
                  <Input
                    style={{
                      background: backGround ? "#333" : "",
                      border: backGround && "none",
                      borderBottom: backGround
                        ? "none "
                        : "1.5px solid #ff4d4f",
                    }}
                    className={backGround ? "inputdarkBg" :"inputLightBg"}
                    type={typeChecking(item)}
                    value={formValue[item]}
                    name={item}
                    onChange={(e) => {
                      changeHandler(e.target.value, item);
                    }}
                  />
                  {!formValue[item] &&
                    validation &&
                    displayValidationError(item)}
                </div>
              );
          }
        })}
        <Button
          type="primary"
          danger
          style={backGround && { background: "#333" }}
          onClick={value ? editHandler : submitHandler}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

