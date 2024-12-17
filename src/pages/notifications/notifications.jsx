import { useTranslation } from "react-i18next";
import BoxNotification from "../../components/boxNotification/BoxNotification";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getDataNotification } from "../../components/posts/getDataPost";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

const Notifcations = ({ setCount, count }) => {
  const [t, i18n] = useTranslation();
  const { user, token, deleteNoti_id } = useSelector((state) => state.auth);
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;

  const { items, hasMore, loadMore, setPage, setItems } = getDataNotification(
    1,
    token,
    "get_notification",
    i18n.language
  );
  useEffect(() => {
    if (deleteNoti_id?.id) {
      setItems((prevItems) =>
        prevItems.filter((item) => item.id !== deleteNoti_id?.id)
      );
    }
  }, [deleteNoti_id]);
  const handleButtonClick = async () => {
    try {
      const res = await axios.get(
        `${URL}/api/mark_all_notification_as_read`,

        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCount(0);
      setPage(0);
    } catch (err) {
      // toast.error(t("A network error occurred"));
    }
  };

  const [notificationData, setNotificationData] = useState(null);

  useEffect(() => {
    // Pusher.logToConsole = true;

    const pusher = new Pusher("29003cf7a18fad5a715b", {
      cluster: "mt1",
      encrypted: true,
    });

    const channel = pusher.subscribe(`notification${user?.id}`);

    channel.bind("NewNotification", function (data) {
      setNotificationData(data); // Set the received data to state
      setItems((prev) => [data[1], ...prev]);
      setCount(data[0].count);
    });

    // return () => {
    //   channel.unbind_all();
    //   channel.unsubscribe();
    // };
  }, []);

  return (
    <>
      {" "}
      <div className="max-w-4xl m-auto">
        {count?.length > 0 && (
          <div
            className="w-full bg-white mb-2 text-center cursor-pointer py-2"
            style={{ borderRadius: "10px" }}
            onClick={() => handleButtonClick()}
          >
            {t("Read All")}
          </div>
        )}

        <InfiniteScroll
          dataLength={items.length}
          next={loadMore}
          hasMore={hasMore}
          loader={<div className="lds-default  m-auto d-flex"></div>}
        >
          <div className="notification">
            {items[0]?.data
              ? items.map((notification) => (
                  <BoxNotification
                    key={notification.id}
                    notification={notification}
                  />
                ))
              : ""}
            {/* <BoxNotification />
          <BoxNotification /> */}
          </div>
        </InfiniteScroll>
        {/* sidebar */}
        {items?.length == 0 && <div className="text-center">{t("There are no notifications")}</div>}
        <style>
          {`
                 @media (max-width: 800px) {
                  
                  li {
                    flex-flow: wrap;
                  }
                  .par {
                     margin-left: 0px!important; 
                  }
                }

                @media (max-width: 800px) {
                  .myside {
                    width:92%!important;
                  }
                  }
                 `}
        </style>
      </div>
      <style>
        {`
                 @media (max-width: 800px) {
                  
                  li {
                    flex-flow: wrap;
                  }
                  .par {
                     margin-left: 0px!important; 
                  }
                }

                @media (max-width: 800px) {
                  .myside {
                    width:92%!important;
                  }
                  }
                 `}
      </style>
    </>
  );
};

export default Notifcations;
