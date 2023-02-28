import React, { useCallback, useContext, useEffect, useState } from "react";
import { ARRAY_CONTEXT } from "../App";

const FormComponent = ({
  fields,
  conditionsInteger,
  conditionsString,
  current,
  setCurrent,
  type,
  uid,
}) => {
  const ARRAY = useContext(ARRAY_CONTEXT);
  const [selectField, setSelectField] = useState("");
  const [condition, setCondition] = useState("");
  const [val, setVal] = useState("");
  useEffect(() => {
    let conditionType = "";
    if (type === "all") {
      conditionType = "&&";
    } else if (type === "any") {
      conditionType = "||";
    }
    if (condition !== "") {
      let obj = {
        id: uid,
        data: ` ${conditionType} (${selectField} ${
          selectField === "Title" || selectField === "Brand"
            ? conditionsString[condition]
            : conditionsInteger[condition]
        } ${val})`,
      };
      setCurrent([...current, obj]);
    }
  }, [
    condition,
    selectField,
    val,
    conditionsInteger,
    conditionsString,
    setCurrent,
    current,
    type,
    uid,
  ]);
  const deleteRow = (uid) => {
    console.log("UID passed", uid);
    for (let i = 0; i < ARRAY.array.length; i++) {
      console.log("index of array", i, ARRAY.array[i]);
      if (ARRAY.array[i].id === uid) {
        // console.log("CURRENT--->", current);
        ARRAY.array.splice(i, 1);
        ARRAY.setArray([...ARRAY.array]);
        for (let j = 0; j < current.length; j++) {
          if (current[j].id === uid) {
            current.splice(j, 1);
            setCurrent([...current, { id: 12121, data: "asasasas  " }]);
          }
        }
      }
    }
  };
  const dele = useCallback((uid) => {
    console.log("UID passed", uid);
    for (let i = 0; i < ARRAY.array.length; i++) {
      console.log("index of array", i, ARRAY.array[i]);
      if (ARRAY.array[i].id === uid) {
        // console.log("CURRENT--->", current);
        ARRAY.array.splice(i, 1);
        ARRAY.setArray([...ARRAY.array]);
        for (let j = 0; j < current.length; j++) {
          if (current[j].id === uid) {
            current.splice(j, 1); 
            setCurrent([...current, { id: 12121, data: "asasasas   " }]);
          }
        }
      }
    }
  }, [current]);
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
            style={{ width: "250px" }}
            className="form-control"
            onChange={(e) => setVal(e.target.value)}
          />
        </span>
        <span>
          {/* {console.log("Index Clicked", uid)} */}
          {uid === 0 ? null : (
            <button className="btn btn-danger" onClick={() => dele(uid)}>
              Delete
            </button>
          )}
        </span>
      </div>
    </>
  );
};

export default FormComponent;

