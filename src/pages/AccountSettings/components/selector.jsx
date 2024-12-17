// eslint-disable-next-line react/prop-types
export default function Selector({ label, option1, option2, option3 }) {
    return (
        <div className="col-lg-12 mb-3">
            <div className="form-group">
                <label className="" style={{ color: "black", fontSize: "18px", marginBotton: "2rem" }}>
                    {label}
                </label>
                <select className="form-control minimal" style={{ border: "none", padding: "0.75rem 0.75rem " }}>
                    <option value="Anyone">{option1}</option>
                    <option value="friendsonly">{option2}</option>
                    <option value="justme">{option3}</option>
                </select>
            </div>
        </div>
    );
}