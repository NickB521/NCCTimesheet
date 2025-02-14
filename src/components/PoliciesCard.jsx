import { useState } from "react";
const PoliciesCard = ({ policy, setPolicy, isEditable }) => {
    const [editPolicies, setEditPolicies] = useState(true);
    const [submitText, setSubmitText] = useState("Edit");

    return (
      <div className="side-card">
        <h1 className="widget-title">Worksite Policies</h1>
        <div id="worksite-policies">
          <textarea
            disabled={editPolicies}
            onChange={(e) => setPolicy(e.target.value)}
            value={policy}
            style={{
              width: "100%",
              height: "90%",
              color: "black",
              border: "#1C6296 3px solid",
              borderRadius: "10px",
              marginTop: "20px",
            }}
          />
        </div>
        {isEditable ? 
            <button
                id="textarea-button"
                onClick={() => {
                    setEditPolicies(!editPolicies);
                    setSubmitText(editPolicies ? "Submit" : "Edit");
                }}
            >
                {submitText}
            </button> 
            : ""
        }
      </div>
    );
};

export default PoliciesCard;