import React from "react";

function Spinner() {
  return (
    <div className="pg-spinner-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="svg-loader"
        width="55"
        height="55"
        viewBox="0 0 80 80"
      >
        <path
          fill="#fff"
          d="M40 72C22.4 72 8 57.6 8 40S22.4 8 40 8s32 14.4 32 32c0 1.1-.9 2-2 2s-2-.9-2-2c0-15.4-12.6-28-28-28S12 24.6 12 40s12.6 28 28 28c1.1 0 2 .9 2 2s-.9 2-2 2z"
          transform="rotate(95.7744 40 40)"
        >
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 40 40"
            to="360 40 40"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  );
}

export default Spinner;
