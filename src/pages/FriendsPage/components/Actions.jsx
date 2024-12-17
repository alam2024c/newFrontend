import React, { useEffect, useState } from "react";
import AddFollow from "./AddFollow";
import RejectedFollow from "./RejectFollow";

function Actions({ user, margin, action = true }) {
  const [type, setType] = useState(action);
  useEffect(() => {
    setType(action);
  }, [action]);
  return (
    <>
      {type ? (
        <>
          {type == "request_sended" ? (
            <RejectedFollow
              user={user}
              setType={setType}
              type={type}
              margin={margin}
            />
          ) : (
            <AddFollow user={user} setType={setType} margin={margin} />
          )}
        </>
      ) : (
        <RejectedFollow
          user={user}
          setType={setType}
          type={type}
          margin={margin}
        />
      )}
    </>
  );
}

export default Actions;
