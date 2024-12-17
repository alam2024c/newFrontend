/* eslint-disable react/prop-types */
import { useNavigate, useParams } from "react-router-dom";
import Avatar from "./Avatar";
// import { useTranslation } from "react-i18next";

function ChatListItems({
  setChatActive,
  name,
  image,
  active,
  isOnline,
  item,
  setText,
  setItems,
}) {
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const navigate = useNavigate("");
  const user_name = useParams().id;
  // console.log(user_name, item?.user_name);
  // console.log(item);
  const selectChat = (e) => {
    // setText("");
    // console.log(item.id, item, "itemitemitemitem");
    // const addItem = (newItem) => {
    //   setItems((prevItems) => {
    //     // Check if the item with the same id already exists in the array
    //     const itemExists = prevItems.some((ele) => ele.id === newItem.id);
    //     if (!itemExists) {
    //       // If not, add the new item to the beginning of the array
    //       return [newItem, ...prevItems];
    //     }
    //     // If the item is already in the array, return the previous state unchanged
    //     return prevItems;
    //   });
    // };
    // addItem(item);
    navigate(`/chat/${item?.user_name}`);
    setChatActive(true);

    for (
      let index = 0;
      index < e.currentTarget.parentNode.children.length;
      index++
    ) {
      e.currentTarget.parentNode.children[index].classList.remove("active");
    }
    e.currentTarget.classList.add("active");
  };
  // const [t, i18n] = useTranslation();

  return (
    <div
      style={{ animationDelay: `0.${selectChat}s` }}
      onClick={selectChat}
      className={`chatlist__item  d-flex align-items-center justify-content-between  ${
        user_name == item?.user_name ? "active" : ""
      } `}
    >
      <div className="d-flex gap-2">
        <Avatar
          image={
            image ? `${URL}/storage/${image}` : "http://placehold.it/80x80"
          }
          isOnline={item?.last_active_at == "active" ? "active" : "isOpen"}
        />
        <div className="userMeta">
          <p>{name}</p>
          <span>
            {item?.last_message?.body?.slice(0, 50) ||
              item?.last_message?.message?.slice(0, 50)}{" "}
          </span>
        </div>
      </div>
      <div className="align-items-center justify-content-between">
        <span className="activeTime font-xsss">
          {/* {t("ago")} 32 {t("mins")} */}
          {/* 8:34 {formatDate(item?.last_message?.created_at)} */}
        </span>
        {item?.unread_messages_count > 0 && (
          <span className="badge msnumber">{item?.unread_messages_count}</span>
        )}
      </div>
    </div>
  );
}

export default ChatListItems;
