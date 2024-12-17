import { set } from "lodash";
import { useState, useEffect } from "react";
import { logout } from "../../rtk/slices/authSlice";
//get posts

export const getDataPost = (
  initialPage,
  token,
  deletePost_id,
  update,
  api,
  filter,
  lang
) => {
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(initialPage);
  const [lastfilter, setlastfilter] = useState(initialPage);
  const loadMore = () => {
    setPage(page + 1);
  };

  // useEffect(() => {
  //   setItems([]);
  //   setPage(1);
  //   setHasMore(true);
  // }, [filter]);

  useEffect(() => {
    // if (page == 0) {
    //   setPage(1);
    // }
    const fetchData = async () => {
      const response = await fetch(
        `${URL}/api/${api}?page=${page}&category_id=${filter}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept-Language": lang,
          },
        }
      );

      const data = await response.json();
      if (data.status === 429) {
        // Implement backoff logic here
        console.log("too many at the post data")
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
        fetchData();
        return;
      }
      console.log(data);
      if (page > 0) {
        setItems((prevItems) => [...prevItems, ...data.data]);
      } else {
        setItems([...data.data]);
      }

      if (data?.data.length === 0) {
        setHasMore(false);
      }
    };

    if (hasMore) {
      fetchData();
    }
  }, [page, hasMore]);

  useEffect(() => {
    // if (page == 0) {
    //   setPage(1);
    // }
    if (filter) {
      setPage(1);
      setItems([]);
      setHasMore(true);
      const fetchData = async () => {
        const response = await fetch(
          `${URL}/api/${api}?page=1&category_id=${filter}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              "Accept-Language": lang,
            },
          }
        );

        const data = await response.json();
        if (data.status === 429) {
          // Implement backoff logic here
          await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
          fetchData();
          return;
        }
        if (page > 0) {
          setItems((prevItems) => [...prevItems, ...data.data]);
        } else {
          setItems([...data.data]);
        }

        if (data?.data.length === 0) {
          setHasMore(false);
        }
      };

      if (hasMore) {
        fetchData();
      }
    }
  }, [filter]);

  const updatePost = (postId, updatedData) => {
    setItems((prevItems) =>
      prevItems.map((post) =>
        post.id === postId ? { ...post, ...updatedData } : post
      )
    );
  };

  const addOrUpdatePost = (update) => {
    if (update.id) {
      const existingPostIndex = items.findIndex(
        (post) => post.id === update.id
      );

      if (existingPostIndex !== -1) {
        // Post found, update it
        updatePost(update.id, update);
      } else {
        // Post not found, add it to the beginning of the array
        setItems((prevItems) => [update, ...prevItems]);
      }
    }
  };

  useEffect(() => {
    if (update?.id) {
      addOrUpdatePost(update);
    }
  }, [update]);

  useEffect(() => {
    const deletePost_idHandle = (deletePost_id) => {
      setItems((prevItems) =>
        prevItems.filter((post) => post.id !== deletePost_id.post_id)
      );
    };
    deletePost_idHandle(deletePost_id);
  }, [deletePost_id]);
  return { items, hasMore, loadMore };
};

//get posts
export const getDataPostRate = (initialPage, token, api, user_name) => {
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(initialPage);

  const loadMore = () => {
    setPage(page + 1);
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${URL}/api/${api}/${user_name}?page=${page}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (data.status === 429) {
        // Implement backoff logic here
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
        fetchData();
        return;
      }

      if (page > 0) {
        setItems((prevItems) => [...prevItems, ...data?.data]);
      } else {
        setItems([...data?.data]);
      }

      if (data?.data.length === 0) {
        setHasMore(false);
      }
    };

    if (hasMore) {
      fetchData();
    }
  }, [page, hasMore, token]);

  return { items, hasMore, loadMore };
};

//get posts
export const getDataPostJobs = (
  initialPage,
  token,
  deletePost_id,
  update,
  api,
  filter,
  dispatch,
  navigate,
  lang
) => {
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(initialPage);

  const loadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${URL}/api/${api}?page=${page}&category_id=${filter}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept-Language": lang,
          },
        }
      );

      const data = await response.json();
      if (data?.status == 401) {
        dispatch(logout());
        navigate("/login");
      }
      if (data.status === 429) {
        // Implement backoff logic here
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
        fetchData();
        return;
      }
      if (data?.status == "Authorization Token not found") {
        dispatch(logout());
        navigate("/login");
      }
      if (page > 0) {
        if (items[0]?.id) {
          setItems((prevItems) => [...prevItems, ...data.data]);
        } else {
          setItems((prevItems) => [...data.data]);
        }
      } else {
        setItems([...data.data]);
      }

      if (data?.data.length === 0) {
        setHasMore(false);
      }
    };

    if (hasMore) {
      fetchData();
    }
  }, [page, hasMore, token]);
  useEffect(() => {
    if (filter) {
      setPage(1);
      setItems([]);
      setHasMore(true);
      const fetchData = async () => {
        const response = await fetch(
          `${URL}/api/${api}?page=1&category_id=${filter}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              "Accept-Language": lang,
            },
          }
        );

        const data = await response.json();
        if (data.status === 429) {
          // Implement backoff logic here
          await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
          fetchData();
          return;
        }
        if (page > 0) {
          if (items[0]?.id) {
            setItems((prevItems) => [...prevItems, ...data.data]);
          } else {
            setItems((prevItems) => [...data.data]);
          }
        } else {
          setItems([...data.data]);
        }

        if (data?.data.length === 0) {
          setHasMore(false);
        }
      };

      if (hasMore) {
        fetchData();
      }
    }
  }, [filter]);
  const updatePost = (postId, updatedData) => {
    setItems((prevItems) =>
      prevItems.map((post) =>
        post.id === postId ? { ...post, ...updatedData } : post
      )
    );
  };

  const addOrUpdatePost = (update) => {
    const existingPostIndex = items.findIndex((post) => post.id === update.id);

    if (existingPostIndex !== -1) {
      // Post found, update it
      updatePost(update.id, update);
    } else {
      // Post not found, add it to the beginning of the array
      setItems((prevItems) => [update, ...prevItems]);
    }
  };

  useEffect(() => {
    addOrUpdatePost(update);
  }, [update]);

  useEffect(() => {
    const deletePost_idHandle = (deletePost_id) => {
      setItems((prevItems) =>
        prevItems.filter((post) => post.id !== deletePost_id.post_id)
      );
    };
    deletePost_idHandle(deletePost_id);
  }, [deletePost_id]);
  return { items, hasMore, loadMore };
};
export const getDataPostJobAdvertisement = (
  initialPage,
  token,
  deletePost_id,
  update,
  api,
  filter,
  dispatch,
  navigate,
  lang
) => {
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(initialPage);

  const loadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${URL}/api/${api}?page=${page}&category_id=${filter}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept-Language": lang,
          },
        }
      );

      const data = await response.json();
      if (data?.status == 401) {
        dispatch(logout());
        navigate("/login");
      }
      if (data.status === 429) {
        // Implement backoff logic here
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
        fetchData();
        return;
      }
      if (data?.status == "Authorization Token not found") {
        dispatch(logout());
        navigate("/login");
      }
      if (page > 0) {
        if (items[0]?.id) {
          setItems((prevItems) => [...prevItems, ...data.data]);
        } else {
          setItems((prevItems) => [...data.data]);
        }
        // setItems((prevItems) => [...prevItems, ...data.data]);
      } else {
        setItems([...data.data]);
      }

      if (data?.data.length === 0) {
        setHasMore(false);
      }
    };

    if (hasMore) {
      fetchData();
    }
  }, [page, hasMore, token]);
  useEffect(() => {
    if (filter) {
      setPage(1);
      setItems([]);
      setHasMore(true);
      const fetchData = async () => {
        const response = await fetch(
          `${URL}/api/${api}?page=1&category_id=${filter}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              "Accept-Language": lang,
            },
          }
        );

        const data = await response.json();
        if (data.status === 429) {
          // Implement backoff logic here
          await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
          fetchData();
          return;
        }
        if (page > 0) {
          if (items[0]?.id) {
            setItems((prevItems) => [...prevItems, ...data.data]);
          } else {
            setItems((prevItems) => [...data.data]);
          }
        } else {
          setItems([...data.data]);
        }

        if (data?.data.length === 0) {
          setHasMore(false);
        }
      };

      if (hasMore) {
        fetchData();
      }
    }
  }, [filter]);
  const updatePost = (postId, updatedData) => {
    setItems((prevItems) =>
      prevItems.map((post) =>
        post.id === postId ? { ...post, ...updatedData } : post
      )
    );
  };

  const addOrUpdatePost = (update) => {
    const existingPostIndex = items.findIndex((post) => post.id === update.id);

    if (existingPostIndex !== -1) {
      // Post found, update it
      updatePost(update.id, update);
    } else {
      // Post not found, add it to the beginning of the array
      setItems((prevItems) => [update, ...prevItems]);
    }
  };

  useEffect(() => {
    addOrUpdatePost(update);
  }, [update]);

  useEffect(() => {
    const deletePost_idHandle = (deletePost_id) => {
      setItems((prevItems) =>
        prevItems.filter((post) => post.id !== deletePost_id.post_id)
      );
    };
    deletePost_idHandle(deletePost_id);
  }, [deletePost_id]);
  return { items, hasMore, loadMore };
};

//get posts
export const getDataPostJobsPage = (
  initialPage,
  token,
  deletePost_id,
  update,
  api,
  filter,
  dispatch,
  navigate,
  lang
) => {
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(initialPage);

  const loadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${URL}/api/${api}?page=${page}&category_id=${filter}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept-Language": lang,
          },
        }
      );

      const data = await response.json();
      if (data.status === 429) {
        // Implement backoff logic here
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
        fetchData();
        return;
      }
      if (data?.status == 401) {
        dispatch(logout());
        navigate("/login");
      }
      if (data?.status == "Authorization Token not found") {
        dispatch(logout());
        navigate("/login");
      }
      if (page > 0) {
        if (items[0]?.id) {
          setItems((prevItems) => [...prevItems, ...data.data]);
        } else {
          setItems((prevItems) => [...data.data]);
        }
      } else {
        setItems([...data.data]);
      }

      if (data?.data.length === 0) {
        setHasMore(false);
      }
    };

    if (hasMore) {
      fetchData();
    }
  }, [page, hasMore, token]);
  useEffect(() => {
    if (filter) {
      setPage(1);
      setItems([]);
      setHasMore(true);
      const fetchData = async () => {
        const response = await fetch(
          `${URL}/api/${api}?page=1&category_id=${filter}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              "Accept-Language": lang,
            },
          }
        );

        const data = await response.json();
        if (data.status === 429) {
          // Implement backoff logic here
          await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
          fetchData();
          return;
        }
        if (page > 0) {
          if (items[0]?.id) {
            setItems((prevItems) => [...prevItems, ...data.data]);
          } else {
            setItems((prevItems) => [...data.data]);
          }
        } else {
          setItems([...data.data]);
        }

        if (data?.data.length === 0) {
          setHasMore(false);
        }
      };

      if (hasMore) {
        fetchData();
      }
    }
  }, [filter]);
  const updatePost = (postId, updatedData) => {
    setItems((prevItems) =>
      prevItems.map((post) =>
        post.id === postId ? { ...post, ...updatedData } : post
      )
    );
  };

  const addOrUpdatePost = (update) => {
    const existingPostIndex = items.findIndex((post) => post.id === update.id);

    if (existingPostIndex !== -1) {
      // Post found, update it
      updatePost(update.id, update);
    } else {
      // Post not found, add it to the beginning of the array
      setItems((prevItems) => [update, ...prevItems]);
    }
  };

  useEffect(() => {
    addOrUpdatePost(update);
  }, [update]);

  useEffect(() => {
    const deletePost_idHandle = (deletePost_id) => {
      setItems((prevItems) =>
        prevItems.filter((post) => post.id !== deletePost_id.post_id)
      );
    };
    deletePost_idHandle(deletePost_id);
  }, [deletePost_id]);
  return { items, hasMore, loadMore };
};

//get posts
export const getDataPostOffer = (
  initialPage,
  token,
  deletePost_id,
  update,
  api,
  filter
) => {
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
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
        fetchData();
        return;
      }
      const newData = data?.data || [];
      if (page > 0) {
        setItems((prevItems) => {
          // Combine previous items and new data, and filter out duplicates
          const allItems = [...prevItems, ...newData];
          const uniqueItems = allItems.filter(
            (item, index, self) =>
              index ===
              self.findIndex(
                (t) => t.id === item.id // Assuming each item has a unique 'id' field
              )
          );
          return uniqueItems;
        });
        // setItems((prevItems) => [...prevItems, ...data.data]);
      } else {
        setItems((prevItems) => {
          // Combine previous items and new data, and filter out duplicates
          const allItems = [...newData];
          const uniqueItems = allItems.filter(
            (item, index, self) =>
              index ===
              self.findIndex(
                (t) => t.id === item.id // Assuming each item has a unique 'id' field
              )
          );
          return uniqueItems;
        });
      }

      if (data?.data.length === 0) {
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

  const addOrUpdatePost = (update) => {
    if (update.id) {
      const existingPostIndex = items.findIndex(
        (post) => post.id === update.id
      );

      if (existingPostIndex !== -1) {
        // Post found, update it
        updatePost(update.id, update);
      } else {
        // Post not found, add it to the beginning of the array
        setItems((prevItems) => [update, ...prevItems]);
      }
    }
  };

  useEffect(() => {
    if (update?.id) {
      addOrUpdatePost(update);
    }
  }, [update]);

  useEffect(() => {
    const deletePost_idHandle = (deletePost_id) => {
      setItems((prevItems) =>
        prevItems.filter((post) => post.id !== deletePost_id.post_id)
      );
    };
    deletePost_idHandle(deletePost_id);
  }, [deletePost_id]);
  return { items, hasMore, loadMore, setPage };
};

//who like posts
//get posts
export const getDataWhoLikePost = (initialPage, token, api) => {
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
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
        fetchData();
        return;
      }

      if (page > 0) {
        setItems((prevItems) => [...prevItems, ...data?.data?.data]);
      } else {
        setItems([...data?.data?.data]);
      }

      if (data?.data?.data.length === 0) {
        setHasMore(false);
      }
    };

    if (hasMore) {
      fetchData();
    }
  }, [page, hasMore, token]);

  return { items, hasMore, loadMore };
};
//get posts
export const getDataWhoLikeComment = (initialPage, token, api) => {
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
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
        fetchData();
        return;
      }

      if (data.data) {
        if (page > 0) {
          setItems((prevItems) => [...prevItems, ...data?.data?.data]);
        } else {
          setItems([...data?.data?.data]);
        }
      }
      if (data?.data?.length === 0) {
        setHasMore(false);
      }
    };

    if (hasMore) {
      fetchData();
    }
  }, [page, hasMore, token]);

  return { items, hasMore, loadMore };
};

//get posts
export const getDataPostServicess = (
  initialPage,
  token,
  deletePost_id,
  update,
  api
) => {
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
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
        fetchData();
        return;
      }
      if (page > 0) {
        setItems((prevItems) => [...prevItems, ...data.data]);
      } else {
        setItems([...data.data]);
      }

      if (data?.data.length === 0) {
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

  const addOrUpdatePost = (update) => {
    const existingPostIndex = items.findIndex((post) => post.id === update.id);

    if (existingPostIndex !== -1) {
      // Post found, update it
      updatePost(update.id, update);
    } else {
      // Post not found, add it to the beginning of the array
      setItems((prevItems) => [update, ...prevItems]);
    }
  };

  useEffect(() => {
    addOrUpdatePost(update);
  }, [update]);

  useEffect(() => {
    const deletePost_idHandle = (deletePost_id) => {
      setItems((prevItems) =>
        prevItems.filter((post) => post.id !== deletePost_id.post_id)
      );
    };
    deletePost_idHandle(deletePost_id);
  }, [deletePost_id]);
  return { items, hasMore, loadMore };
};

//get posts
export const getDataNotification = (initialPage, token, api, lang) => {
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
          "Accept-Language": lang,
        },
      });

      const data = await response.json();
      if (data.status === 429) {
        // Implement backoff logic here
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
        fetchData();
        return;
      }

      if (page > 0) {
        setItems((prevItems) => [...prevItems, ...data.data.data]);
      } else {
        setItems([...data.data.data]);
        setPage(2);
      }

      if (data?.data.length === 0) {
        setHasMore(false);
      }
    };

    if (hasMore) {
      fetchData();
    }
  }, [page, hasMore]);

  return { items, hasMore, loadMore, setPage, setItems };
};

//get posts
export const getDataPostProfile = (
  initialPage,
  token,
  api,
  params,
  user,
  deletePost_id,
  update,
  lang
) => {
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
          "Accept-Language": lang,
        },
      });

      const data = await response.json();
      if (data.status === 429) {
        // Implement backoff logic here
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
        fetchData();
        return;
      }
      if (page > 0) {
        setItems((prevItems) => [...prevItems, ...data.data]);
      } else {
        setItems([...data.data]);
      }

      if (data?.data.length === 0) {
        setHasMore(false);
      }
    };

    if (hasMore) {
      fetchData();
    }
  }, [page, hasMore, token, params]);
  useEffect(() => {
    setItems([]);
    setHasMore(true);
    setPage(1);
  }, [user]);
  const updatePost = (postId, updatedData) => {
    setItems((prevItems) =>
      prevItems.map((post) =>
        post.id === postId ? { ...post, ...updatedData } : post
      )
    );
  };

  const addOrUpdatePost = (update) => {
    if (update.id) {
      const existingPostIndex = items.findIndex(
        (post) => post.id === update.id
      );

      if (existingPostIndex !== -1) {
        // Post found, update it
        updatePost(update.id, update);
      } else {
        // Post not found, add it to the beginning of the array
        setItems((prevItems) => [update, ...prevItems]);
      }
    }
  };

  useEffect(() => {
    if (update?.id) {
      addOrUpdatePost(update);
    }
  }, [update]);

  useEffect(() => {
    const deletePost_idHandle = (deletePost_id) => {
      setItems((prevItems) =>
        prevItems.filter((post) => post.id !== deletePost_id.post_id)
      );
    };
    deletePost_idHandle(deletePost_id);
  }, [deletePost_id]);
  return { items, hasMore, loadMore, setItems };
};

//get profile

export const getDataProfile = (token, api, change, params, lang) => {
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const [loadingProfile, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setLoading(true);

    const fetchData = async (retryCount = 0) => {
      try {
        const response = await fetch(`${URL}/api/${api}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept-Language": lang,
          },
        });

        if (response.status === 429) {
          // Backoff logic with a maximum retry count of 3
          await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
          fetchData(retryCount + 1); // Retry fetch
          return;
        }

        const data = await response.json();
        setItems(data.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [change, params]);

  return { items, loadingProfile };
};



// export const getDataProfile = (token, api, change, params, lang) => {
//   const URL = import.meta.env.VITE_REACT_APP_API_KEY;
//   const [loadingProfile, setLoading] = useState(false);
//   const [items, setItems] = useState([]);
//   useEffect(() => {
//     setLoading(true);
//     const fetchData = async () => {
//       const response = await fetch(`${URL}/api/${api}`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//           "Accept-Language": lang,
//         },
//       });

//       const data = await response.json();
//       // if (data.status === 429) {
//       setLoading(false);
//       //   // Implement backoff logic here
//       //   await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
//       //   fetchData();
//       //   return;
//       // }
//       setItems(data.data);
//       // if (page > 0) {
//       //   setItems((prevItems) => [...prevItems, ...data?.data]);
//       // } else {
//       //   setItems([...data?.data]);
//       // }

//       // if (data?.data?.length === 0) {
//       //   setHasMore(false);
//       // }
//     };
//     fetchData();
//   }, [change, params]);

//   return { items, loadingProfile };
// };

//get product news

export const getDataNews = (
  initialPage,
  token,
  deletePost_id,
  updateNews,
  api,
  filteringBy
) => {
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(initialPage);

  const loadMore = () => {
    setPage(page + 1);
  };
  let API_URL;
  useEffect(() => {
    if (filteringBy) {
      API_URL = `${URL}/api/${api}?category_id=${filteringBy}&page=${page}`;
    } else {
      API_URL = `${URL}/api/${api}?page=${page}`;
    }
    const fetchData = async () => {
      const response = await fetch(
        `${URL}/api/${api}?category_id=${filteringBy}&page=${page}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (page > 0) {
        // setItems((prevItems) => [...prevItems, ...data?.data.data]);
        setItems((prevItems) => {
          // Extract unique identifiers from the current items
          const uniqueIds = new Set(prevItems.map((item) => item.id));

          // Filter out new items that have already been added
          const filteredNewItems = data?.data?.filter(
            (item) => !uniqueIds.has(item.id)
          );

          // Concatenate the previous items with the filtered new items
          return [...prevItems, ...filteredNewItems];
        });
      } else {
        setItems([...data?.data]);
      }

      if (data?.data?.length === 0) {
        setHasMore(false);
      }
    };

    if (hasMore) {
      fetchData();
    }
  }, [page, hasMore, token, filteringBy]);
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    setItems([]);
  }, [filteringBy]);

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
      addOrUpdatePost(updateNews);
    }
  }, [updateNews]);

  // useEffect(() => {
  //   const deletePost_idHandle = (deletePost_id) => {
  //     setItems((prevItems) =>
  //       prevItems.filter((post) => post.id !== deletePost_id.post_id)
  //     );
  //   };
  //   deletePost_idHandle(deletePost_id);
  // }, [deletePost_id]);
  return { items, hasMore, loadMore };
};

//videos
export const getDataPostVideos = (
  initialPage,
  token,
  deletePost_id,
  update,
  api
) => {
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
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
        fetchData();
        return;
      }
      if (page > 0) {
        setItems((prevItems) => [...prevItems, ...data?.posts_type_video]);
      } else {
        setItems([...data?.posts_type_video]);
      }

      if (data?.posts_type_video.length === 0) {
        setHasMore(false);
      }
    };

    if (hasMore) {
      fetchData();
    }
  }, [page, hasMore, token]);

  return { items, hasMore, loadMore };
};
//videos
export const getDataPostArticle = (
  initialPage,
  token,
  deletePost_id,
  update,
  api
) => {
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
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
        fetchData();
        return;
      }
      if (page > 0) {
        setItems((prevItems) => [...prevItems, ...data?.data]);
      } else {
        setItems([...data?.data]);
      }

      if (data?.data.length === 0) {
        setHasMore(false);
      }
    };

    if (hasMore) {
      fetchData();
    }
  }, [page, hasMore, token]);

  return { items, hasMore, loadMore };
};
//videos
export const getDataPostTag = (
  initialPage,
  token,

  api,
  tag
) => {
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(initialPage);

  const loadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${URL}/api/${api}/${tag}?page=${page}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.status === 429) {
        // Implement backoff logic here
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
        fetchData();
        return;
      }
      if (page > 0) {
        setItems((prevItems) => [...prevItems, ...data?.data]);
      } else {
        setItems([...data?.data]);
      }

      if (data?.data.length === 0) {
        setHasMore(false);
      }
    };

    if (hasMore) {
      fetchData();
    }
  }, [page, hasMore, token]);

  return { items, hasMore, loadMore };
};

//videos
export const getDataPostResearch = (
  initialPage,
  token,
  deletePost_id,
  update,
  api
) => {
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
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
        fetchData();
        return;
      }
      if (page > 0) {
        setItems((prevItems) => [...prevItems, ...data?.data]);
      } else {
        setItems([...data?.data]);
      }

      if (data?.data.length === 0) {
        setHasMore(false);
      }
    };

    if (hasMore) {
      fetchData();
    }
  }, [page, hasMore, token]);

  return { items, hasMore, loadMore };
};

//videos
export const getDataPostSummeries = (
  initialPage,
  token,
  deletePost_id,
  update,
  api
) => {
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
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
        fetchData();
        return;
      }
      if (page > 0) {
        setItems((prevItems) => [...prevItems, ...data?.data]);
      } else {
        setItems([...data?.data]);
      }

      if (data?.data.length === 0) {
        setHasMore(false);
      }
    };

    if (hasMore) {
      fetchData();
    }
  }, [page, hasMore, token]);

  return { items, hasMore, loadMore };
};

//reels

export const getDataPostReels = (
  initialPage,
  token,
  deletePost_id,
  update,
  api
) => {
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
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
        fetchData();
        return;
      }
      if (page > 0) {
        setItems((prevItems) => [...prevItems, ...data?.data]);
      } else {
        setItems([...data?.data]);
      }

      if (data?.data.length === 0) {
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

  const addOrUpdatePost = (update) => {
    const existingPostIndex = items.findIndex((post) => post.id === update.id);

    if (existingPostIndex !== -1) {
      // Post found, update it
      updatePost(update.id, update);
    } else {
      // Post not found, add it to the beginning of the array
      setItems((prevItems) => [update, ...prevItems]);
    }
  };

  useEffect(() => {
    addOrUpdatePost(update);
  }, [update]);

  useEffect(() => {
    const deletePost_idHandle = (deletePost_id) => {
      setItems((prevItems) =>
        prevItems.filter((post) => post.id !== deletePost_id.post_id)
      );
    };
    deletePost_idHandle(deletePost_id);
  }, [deletePost_id]);
  return { items, hasMore, loadMore };
};

//comment
export const getDataComment = (
  initialPage,
  token,
  deleteComment_id,
  update,
  api,
  postData
) => {
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
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();
      if (data.status === 429) {
        // Implement backoff logic here
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
        fetchData();
        return;
      }
      if (page > 0) {
        setItems((prevItems) => [...prevItems, ...data.original.comment.data]);
      } else {
        setItems([...data.original.comment.data]);
      }

      if (data.original.comment.data.length === 0) {
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

  const addOrUpdatePost = (update) => {
    const existingPostIndex = items.findIndex((post) => post.id === update.id);

    if (existingPostIndex !== -1) {
      // Post found, update it
      updatePost(update.id, update);
    } else {
      // Post not found, add it to the beginning of the array
      setItems((prevItems) => [update, ...prevItems]);
    }
  };

  useEffect(() => {
    addOrUpdatePost(update);
  }, [update]);

  useEffect(() => {
    const deleteComment_idHandle = (deleteComment_id) => {
      setItems((prevItems) =>
        prevItems.filter((post) => post.id !== deleteComment_id.post_id)
      );
    };

    deleteComment_idHandle(deleteComment_id);
  }, [deleteComment_id]);
  return { items, hasMore, loadMore };
};

//firends page

export const getDataFriends = (
  initialPage,
  token,
  api,
  params,
  navigate,
  dispatch
) => {
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(initialPage);
  let api_url;
  if (params) {
    api_url = `${URL}/api/${api}?page=${page}&user_name=${params}`;
  } else {
    api_url = `${URL}/api/${api}?page=${page}`;
  }
  const loadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${api_url}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data?.status == 401) {
        dispatch(logout());
        navigate("/login");
      }
      if (data.status === 429) {
        // Implement backoff logic here
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
        fetchData();
        return;
      }
      if (page > 0) {
        // setItems((prevItems) => [...prevItems, ...data?.data]);
        const newData = data?.data || [];

        setItems((prevItems) => {
          // Combine previous items and new data, and filter out duplicates
          const allItems = [...prevItems, ...newData];
          const uniqueItems = allItems.filter(
            (item, index, self) =>
              index ===
              self.findIndex(
                (t) => t.id === item.id // Assuming each item has a unique 'id' field
              )
          );
          return uniqueItems;
        });
      } else {
        setItems([...data?.data]);
      }

      if (data?.data?.length === 0) {
        setHasMore(false);
      }
    };

    if (hasMore) {
      fetchData();
    }
  }, [page, hasMore, token]);
  useEffect(() => {
    setPage(1);
  }, [params]);

  return { items, hasMore, loadMore };
};
//firends page

export const getDataFollowers = (
  initialPage,
  token,
  api,
  params,
  navigate,
  dispatch
) => {
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(initialPage);
  let api_url;
  if (params) {
    api_url = `${URL}/api/${api}?page=${page}&user_name=${params}`;
  } else {
    api_url = `${URL}/api/${api}?page=${page}`;
  }
  const loadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${api_url}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data?.status == 401) {
        dispatch(logout());
        navigate("/login");
      }
      if (data.status === 429) {
        // Implement backoff logic here
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
        fetchData();
        return;
      }
      if (page > 0) {
        // setItems((prevItems) => [...prevItems, ...data?.data]);
        const newData = data?.data || [];

        setItems((prevItems) => {
          // Combine previous items and new data, and filter out duplicates
          const allItems = [...prevItems, ...newData];
          const uniqueItems = allItems.filter(
            (item, index, self) =>
              index ===
              self.findIndex(
                (t) => t.id === item.id // Assuming each item has a unique 'id' field
              )
          );
          return uniqueItems;
        });
      } else {
        setItems([...data?.data]);
      }

      if (data?.data?.length === 0) {
        setHasMore(false);
      }
    };

    if (hasMore) {
      fetchData();
    }
  }, [page, hasMore, token]);
  useEffect(() => {
    setPage(1);
  }, [params]);

  return { items, hasMore, loadMore };
};

//Requests
export const getDataRequests = (
  initialPage,
  token,
  api,
  navigate,
  dispatch
) => {
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
      if (data?.status == 401) {
        dispatch(logout());
        navigate("/login");
      }
      if (data.status === 429) {
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
        fetchData();
        return;
      }

      if (page > 0) {
        setItems((prevItems) => [...prevItems, ...data?.data]);
      } else {
        setItems([...data?.data]);
      }
      if (data?.data?.length === 0) {
        setHasMore(false);
      }
    };
    if (hasMore) {
      fetchData();
    }
  }, [page, hasMore, token]);

  return { items, hasMore, loadMore };
};
//suggest
export const getDataSuggest = (initialPage, token, api, navigate, dispatch) => {
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
      if (data?.status == 401) {
        dispatch(logout());
        navigate("/login");
      }
      if (data.status === 429) {
        // Implement backoff logic here
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
        fetchData();
        return;
      }
      if (page > 0) {
        setItems((prevItems) => [...prevItems, ...data?.data]);
      } else {
        setItems([...data?.data]);
      }

      if (data?.data?.length === 0) {
        setHasMore(false);
      }
    };

    if (hasMore) {
      fetchData();
    }
  }, [page, hasMore, token]);

  return { items, hasMore, loadMore };
};

// get search ;

export const getDataSearch = (
  initialPage,
  token,
  api,
  text,
  filteringBy,
  navigate,
  dispatch
) => {
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(initialPage);

  const loadMore = () => {
    setPage(page + 1);
  };

  const fetchData = async () => {
    if (text) {
      const response = await fetch(
        `${URL}/api/${api}?type=${filteringBy}&query=${text}&page=${page}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          // body: JSON.stringify({ query: text }),
        },
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          // body: JSON.stringify({ query: text }),
        }
      );

      const data = await response.json();
      if (data?.status == 401) {
        dispatch(logout());
        navigate("/login");
      }
      if (page > 1) {
        setItems((prevItems) => [...prevItems, ...data.data]);
      } else {
        setItems([...data.data]);
      }

      if (data?.data.length === 0) {
        setHasMore(false);
      }
    }
  };
  useEffect(() => {
    setHasMore(true);
    setPage(1);
    // if (hasMore) {
    //   fetchData();
    // }
  }, [filteringBy]);
  useEffect(() => {
    fetchData();
    // if (hasMore) {
    //   fetchData();
    // }
  }, [page, token, text, filteringBy]);

  // useEffect(() => {get}, [text]);

  return { items, hasMore, loadMore, setPage, setItems };
};

//GET contacts

export const getDataContacts = (
  initialPage,
  token,
  api,
  text,
  navigate,
  dispatch
  // setLoading
) => {
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(initialPage);

  const loadMore = () => {
    setPage(page + 1);
  };

  const fetchData = async () => {
    // if (page == 1) {
    //   setLoading(true);
    // }
    const response = await fetch(`${URL}/api/${api}?search=${text}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ query: text }),
    });

    const data = await response.json();
    // setLoading(false);

    if (data?.status == 401) {
      dispatch(logout());
      navigate("/login");
    }
    if (page > 1) {
      setItems((prevItems) => [...prevItems, ...data.contacts]);
    } else {
      setItems([...data.contacts]);
    }

    if (data?.data?.length === 0) {
      setHasMore(false);
    }
  };
  useEffect(() => {
    setHasMore(true);
    setPage(1);
    // if (hasMore) {
    //   fetchData();
    // }
  }, []);
  useEffect(() => {
    fetchData();
    // if (hasMore) {
    //   fetchData();
    // }
  }, [page, token, text]);

  // useEffect(() => {get}, [text]);

  return { items, hasMore, loadMore, setPage, setItems };
};

//GET getDataMessage

export const getDataMessage = (initialPage, token, id) => {
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(initialPage);

  const loadMore = () => {
    setPage(page + 1);
  };

  const fetchData = async () => {
    if (id) {
      const response = await fetch(
        `${URL}/api/chatify/fetchMessages?page=${page}`,
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
          }),
        }
      );
      const data = await response.json();
      console.log(data , "test the get messages ")
      if (page > 1) {
        setItems((prevData) => [...data?.messages?.reverse(), ...prevData]);
        // setItems((prevItems) => [...prevItems, ...data.contacts]);
      } else {
        setItems([...data?.messages?.reverse()]);
      }

      if (data.messages === 0) {
        setHasMore(false);
      }
    }

    // if (data?.status == 401) {
    //   dispatch(logout());
    //   navigate("/login");
    // }
  };
  useEffect(() => {
    setHasMore(true);
    setPage(1);
  }, [id]);
  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [page, token, id]);

  return { items, hasMore, loadMore, setPage, setItems };
};

// courses

//get posts
export const getDataPostMyCourses = (
  initialPage,
  token,
  deletePost_id,
  update,
  api,
  filter,
  dispatch,
  navigate
) => {
  const URL = import.meta.env.VITE_REACT_APP_API_KEY;
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(initialPage);

  const loadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${URL}/api/${api}?page=${page}&search=${filter}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (data.status === 429) {
        // Implement backoff logic here
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
        fetchData();
        return;
      }
      if (data?.status == 401) {
        dispatch(logout());
        navigate("/login");
      }
      if (data?.status == "Authorization Token not found") {
        dispatch(logout());
        navigate("/login");
      }
      if (page > 0) {
        if (items[0]?.id) {
          setItems((prevItems) => [...prevItems, ...data.data]);
        } else {
          setItems((prevItems) => [...data.data]);
        }
      } else {
        setItems([...data.data]);
      }

      if (data?.data.length === 0) {
        setHasMore(false);
      }
    };

    if (hasMore) {
      fetchData();
    }
  }, [page, hasMore, token]);
  useEffect(() => {
    if (filter) {
      setPage(1);
      setItems([]);
      setHasMore(true);
      const fetchData = async () => {
        const response = await fetch(
          `${URL}/api/${api}?page=1&search=${filter}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        if (data.status === 429) {
          // Implement backoff logic here
          await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds
          fetchData();
          return;
        }
        if (page > 0) {
          if (items[0]?.id) {
            setItems((prevItems) => [...prevItems, ...data.data]);
          } else {
            setItems((prevItems) => [...data.data]);
          }
        } else {
          setItems([...data.data]);
        }

        if (data?.data.length === 0) {
          setHasMore(false);
        }
      };

      if (hasMore) {
        fetchData();
      }
    }
  }, [filter]);
  const updatePost = (postId, updatedData) => {
    setItems((prevItems) =>
      prevItems.map((post) =>
        post.id === postId ? { ...post, ...updatedData } : post
      )
    );
  };

  const addOrUpdatePost = (update) => {
    const existingPostIndex = items.findIndex((post) => post.id === update.id);

    if (existingPostIndex !== -1) {
      // Post found, update it
      updatePost(update.id, update);
    } else {
      // Post not found, add it to the beginning of the array
      setItems((prevItems) => [update, ...prevItems]);
    }
  };

  useEffect(() => {
    addOrUpdatePost(update);
  }, [update]);

  useEffect(() => {
    const deletePost_idHandle = (deletePost_id) => {
      setItems((prevItems) =>
        prevItems.filter((post) => post.id !== deletePost_id.id)
      );
    };
    deletePost_idHandle(deletePost_id);
  }, [deletePost_id]);
  return { items, hasMore, loadMore };
};
