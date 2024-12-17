
// eslint-disable-next-line react/prop-types
export default function Caption({ name }) {
    return (
        <div className="" style={{
            fontWeight: "600", color: "black",
            fontSize: "18px", textAlign: "left", marginBottom: "5px", paddingLeft: "25px"
        }}>
            {name}
        </div>
    );
}