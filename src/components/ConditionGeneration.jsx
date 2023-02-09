import React, { useEffect, useState } from "react";
import FormComponent from "./FormComponent";

const ConditionGeneration = () => {
  const [conditionType, setCondtionType] = useState("");
  const [array, setArray] = useState([]);
  const [current, setCurrent] = useState("");
  const fields = ["Title", "Quantity", "Price", "Brand"];
  const conditionsString = {
    Equals: "==",
    "Not Equals": "!=",
    Contain: ".contains",
    "Not Contain": "!contains",
  };

  const conditionsInteger = {
    Equals: "==",
    "Not Equals": "!=",
    "Less Than Equals": "<=",
    "Greater Than Equals": ">=",
  };
  useEffect(() => {
    setArray([
      ...array,
      <FormComponent
        fields={fields}
        conditionsInteger={conditionsInteger}
        conditionsString={conditionsString}
        current={current}
        setCurrent={setCurrent}
        type={conditionType}
      />,
    ]);
  }, []);
  const addRow = () => {
    setArray([
      ...array,
      <FormComponent
        fields={fields}
        conditionsInteger={conditionsInteger}
        conditionsString={conditionsString}
        current={current}
        setCurrent={setCurrent}
        type={conditionType}
      />,
    ]);
  };
  return (
    <div className="main_container">
      <br />
      <h2>Rule Group</h2>
      <h5>Product(s) must match : </h5>
      <div>
        <input
          type="radio"
          id="any"
          onChange={(e) => setCondtionType(e.target.value)}
          name="check_conditions"
          value="any"
        />
          <label htmlFor="any">Any Conditions</label> {" "}
        <input
          type="radio"
          id="all"
          onChange={(e) => setCondtionType(e.target.value)}
          name="check_conditions"
          value="all"
        />
          <label htmlFor="all">All conditions</label>
        <br />
        <br />
      </div>
      {array.length > 0 ? (
        <>
          {array.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </>
      ) : null}
      <button className="btn btn-primary" onClick={addRow}>
        Add More
      </button>
      <br />
      <br />
      {current !== "" ? <strong>Current Condition : {current}</strong> : null}
    </div>
  );
};

export default ConditionGeneration;
