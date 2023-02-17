import React, { useCallback, useContext, useEffect, useState } from "react";
 import { ARRAY_CONTEXT } from "../App";
import FormComponent from "./FormComponent";

const ConditionGeneration = () => {
  const ARRAY = useContext(ARRAY_CONTEXT);
  const [conditionType, setCondtionType] = useState("");
  // const [array, setArray] = useState([]);
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
    let obj = {
      id: 0,
      data: (
        <FormComponent
          fields={fields}
          conditionsInteger={conditionsInteger}
          conditionsString={conditionsString}
          current={current}
          setCurrent={setCurrent}
          type={conditionType}
          uid={0}
        />
      ),
    };
    ARRAY.setArray([...ARRAY.array, obj]);
  }, []);
  const addRow = () => {
    let id = Math.ceil(Math.random() * 1212121);
    let obj = {
      id: id,
      data: (
        <FormComponent
          fields={fields}
          conditionsInteger={conditionsInteger}
          conditionsString={conditionsString}
          current={current}
          setCurrent={setCurrent}
          type={conditionType}
          uid={id}
        />
      ),
    };
    ARRAY.setArray([...ARRAY.array, obj]);
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
      {ARRAY.array.length > 0 ? (
        <>
          {ARRAY.array.map((item, index) => (
            <div key={index}>{item.data}</div>
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
