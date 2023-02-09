import React, { useEffect, useState } from "react";

const FormComponent = ({
  fields,
  conditionsInteger,
  conditionsString,
  current,
  setCurrent,
  type,
}) => {
  const [selectField, setSelectField] = useState("");
  const [condition, setCondition] = useState("");
  const [val, setVal] = useState("");
  useEffect(() => {
    console.log(condition);
    let curr = "";
    let conditionType = "";
    if (type === "all") {
      conditionType = "&&";
    } else if (type === "any") {
      conditionType = "||";
    }
    if (current === null) {
      curr = "";
    } else curr = current;
    if (condition !== "")
      setCurrent(
        `${curr} ${conditionType} (${selectField} ${
          selectField === "Title" || selectField === "Brand"
            ? conditionsString[condition]
            : conditionsInteger[condition]
        } ${val})`
      );
    console.log("after--->", current);
  }, [
    condition,
    selectField,
    val,
    conditionsInteger,
    conditionsString,
    setCurrent,
    current,
    type,
  ]);
  return (
    <>
      <div className="d-flex mb-4">
        <span style={{ marginRight: "2%" }}>
          <select
            style={{ width: "250px" }}
            className="form-select"
            onChange={(e) => setSelectField(e.target.value)}
          >
            <option defaultValue={""} disabled selected>
              Fields
            </option>
            {fields.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
        </span>
        <span style={{ margin: "0% 4% 0% 2%" }}>
          <select
            className="form-select"
            style={{ width: "250px" }}
            onChange={(e) => setCondition(e.target.value)}
          >
            <option defaultValue={""} selected disabled>
              Conditions
            </option>
            {selectField !== "" ? (
              <>
                {selectField === "Title" || selectField === "Brand"
                  ? Object.keys(conditionsString).map((item, index) => (
                      <option value={item} key={index}>
                        {item}
                      </option>
                    ))
                  : Object.keys(conditionsInteger).map((item, index) => (
                      <option value={item} key={index}>
                        {item}
                      </option>
                    ))}
              </>
            ) : (
              <option value="null" disabled>
                Please Select Field First
              </option>
            )}
          </select>
        </span>
        <span style={{ margin: "0% 4% 0% 2%" }}>
          <input
            type="text"
            style={{width:'250px'}}
            className="form-control"
            onChange={(e) => setVal(e.target.value)}
          />
        </span>
      </div>
    </>
  );
};

export default FormComponent;
