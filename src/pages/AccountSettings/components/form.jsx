// eslint-disable-next-line react/prop-types
export default function Form({ label, type, value }) {
    return (
        <div className="mb-3" style={{ width: "50%" }}>
            <div className="form-group">
                <label style={{
                    color: "black", marginBottom: "0.25rem ",
                    fontWeight: "600", fontSize: "11px"
                }}>
                    {label}
                </label>
                <input
                    type={type} style={{ padding: "0.75rem 0.75rem", border: "none" }}
                    className="form-control"
                    value={value}

                />
            </div>
        </div>




    );
}