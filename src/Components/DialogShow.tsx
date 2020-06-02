import React from "react";
import Popup from "reactjs-popup"; // okay, this is for exact tooltip

interface Props{
    openFlag:boolean,
    // onButtonClick:any
}

const DialogShow:React.FunctionComponent<Props>=(props) => {
    // const print=()=>{
    //     console.log("clicked")
    // }
    console.log("we are here")
  return (
    <Popup open={props.openFlag}>
      <div
        style={{
          border: "1px solid lightgray",
          margin: "auto"
        }}
      >
        <div
          style={{
            display: "grid",
            padding: "0.3rem 0.8rem",
            backgroundColor: "#685834",
            float: "right",
            color: "#fff",
            alignItems: "center",
            textAlign: "center",
            borderRadius: "0px 6px 0px 4px",
            cursor: "pointer"
          }}
        //   onClick={print}
        >
          <span style={{ fontSize: 20 }}> ✕ </span>
        </div>
        <div style={{ padding: "1rem" }}>
          <div style={{ fontSize: 18, fontWeight: "bold" }}>{'Alert'}</div>
          <div
            style={{
              color: "#6c7174"
            }}
          >
            Are you sure?
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "15%"
            }}
          >
            <span
              style={{
                padding: "0.375rem 0.75rem",
                border: "1px solid #685834",
                color: "#fff",
                backgroundColor: "#685834",
                borderRadius: "4px",
                width: "80%",
                margin: "auto",
                textAlign: "center",
                cursor: "pointer"
              }}
            //   onClick={print}
            >
              Confirm
            </span>
          </div>
        </div>
      </div>
    </Popup>
  );
};
export default DialogShow;
