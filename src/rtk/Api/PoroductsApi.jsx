//get profile
import { useState, useEffect } from "react";
export const getDataProduct = (token, api, change) => {
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${URL}/api/${api}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.status === 429) {
        // Implement backoff logic here
        console.log("Too Many Requests. Retrying after some time...");
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
        fetchData();
        return;
      }
      console.log(data);
      setItems(data.data);
      // if (page > 0) {
      //   setItems((prevItems) => [...prevItems, ...data?.data]);
      // } else {
      //   setItems([...data?.data]);
      // }

      // if (data?.data?.length === 0) {
      //   setHasMore(false);
      // }
    };
    fetchData();
  }, [change]);

  return { items };
};

//get product used
export const getDataUsed = (
  initialPage,
  token,
  deletePost_id,
  updateNews,
  api
) => {
  console.log(updateNews);
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(initialPage);

  const loadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${URL}/api/${api}?page=${page}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.status === 429) {
        // Implement backoff logic here
        console.log("Too Many Requests. Retrying after some time...");
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
        fetchData();
        return;
      }
      console.log(data);
      if (page > 0) {
        setItems((prevItems) => [...prevItems, ...data?.data.data]);
      } else {
        setItems([...data?.data.data]);
      }

      if (data?.data?.length === 0) {
        setHasMore(false);
      }
    };

    if (hasMore) {
      fetchData();
    }
  }, [page, hasMore, token]);

  const updatePost = (postId, updatedData) => {
    setItems((prevItems) =>
      prevItems.map((post) =>
        post.id === postId ? { ...post, ...updatedData } : post
      )
    );
  };

  const addOrUpdatePost = (updateNews) => {
    const existingPostIndex = items.findIndex(
      (post) => post.id === updateNews.id
    );

    if (existingPostIndex !== -1) {
      // Post found, update it
      updatePost(updateNews.id, updateNews);
    } else {
      // Post not found, add it to the beginning of the array
      setItems((prevItems) => [updateNews, ...prevItems]);
    }
  };

  useEffect(() => {
    if (updateNews?.id) {
      console.log("first");
      addOrUpdatePost(updateNews);
    }
  }, [updateNews]);

  // useEffect(() => {
  //   // console.log(deletePost_id, "ASd");
  //   const deletePost_idHandle = (deletePost_id) => {
  //     setItems((prevItems) =>
  //       prevItems.filter((post) => post.id !== deletePost_id.post_id)
  //     );
  //   };
  //   // console.log(items);
  //   deletePost_idHandle(deletePost_id);
  // }, [deletePost_id]);
  return { items, hasMore, loadMore };
};
