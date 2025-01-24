const ContactCard = ({ groups }) => {
    return (
        <div className="side-card">
            <h1 className="widget-title">Contact Information</h1>
            <div style={{ width: "80%", paddingBottom: "20px" }}>
                {groups.map((group, index) => (
                <div
                    key={index}
                    style={{
                    padding: "0px 20px 20px",
                    marginTop: "20px",
                    border: "#1C6296 3px solid",
                    borderRadius: "10px",
                    }}
                >
                    <h1 className="widget-subtitle">{group.groupName}</h1>
                    {group.people.map((person) => (
                    <div key={person.email}>
                        <b>{person.name}</b>
                        <p style={{ paddingBottom: "10px" }}>{person.email}</p>
                    </div>
                    ))}
                </div>
                ))}
            </div>
        </div>
    );
};

  export default ContactCard;