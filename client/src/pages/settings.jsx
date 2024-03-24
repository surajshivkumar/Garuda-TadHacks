import React, { useState } from "react";
import ReactSwitch from "react-switch";

function ToggleSwitch() {
  const [switchStates, setSwitchStates] = useState(Array(8).fill(true));

  const handleChange = (index, val) => {
    const newSwitchStates = [...switchStates];
    newSwitchStates[index] = val;
    setSwitchStates(newSwitchStates);
  };

  const switchNames = [
    "Name",
    "Mail",
    "Aadress",
    "Phone",
    "CreditCard",
    "SSN",
    "DrivingID",
    "Salary",
  ];

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "10%" }}
    >
      <div
        style={{
          width: "50%",
          maxWidth: "600px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* First column */}
        <div>
          {switchStates.slice(0, 4).map((isChecked, index) => (
            <div key={index} className="switch-container">
              <span style={{ color: "green" }}>{switchNames[index]}</span>
              <div className="switch">
                <ReactSwitch
                  checked={isChecked}
                  onChange={(val) => handleChange(index, val)}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="bg-black-900 text-white p-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Configurations</h1>
          <h3 className="mb-4">Toggle based on used case</h3>
        </div>

        {/* Second column */}
        <div>
          {switchStates.slice(4).map((isChecked, index) => (
            <div key={index + 4} className="switch-container">
              <span style={{ color: "green" }}>{switchNames[index + 4]}</span>
              <div className="switch">
                <ReactSwitch
                  checked={isChecked}
                  onChange={(val) => handleChange(index + 4, val)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ToggleSwitch;
