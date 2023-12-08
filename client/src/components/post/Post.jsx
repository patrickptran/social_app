import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";

import { useState, useContext } from "react";
import { Comments } from "../comments/Comments";
import moment from "moment";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const { isPending, error, data } = useQuery({
    queryKey: ["likes", post.id],
    queryFn: () =>
      makeRequest.get("/likes?postId=" + post.id).then((res) => {
        return res.data;
      }),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (liked) => {
      console.log(liked);
      if (liked) return makeRequest.delete("/likes?postId=" + post.id);
      return makeRequest.post("/likes", { postId: post.id });
    },
    onError: (error, variables, context) => {
      // An error happened!
      console.log(`rolling back optimistic update with id ${context.id}`);
    },
    onSuccess: (data, variables, context) => {
      // Boom baby!
      queryClient.invalidateQueries(["likes"]);
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });

  const handleLike = () => {
    mutation.mutate(data.includes(currentUser.id));
  };

  const deleteMutation = useMutation({
    mutationFn: (postId) => {
      return makeRequest.delete("/posts/" + postId);
    },
    onSuccess: (data, variables, context) => {
      // Boom baby!
      queryClient.invalidateQueries(["posts"]);
    },
  });
  const handleDelete = () => {
    deleteMutation.mutate(post.id);
  };
  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <Link to={`/profile/${post.userId}`}>
              <img src={"./upload/" + post.profilePic} alt="" />
            </Link>

            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date"> {moment(post.createdAt).fromNow()}</span>
            </div>
          </div>

          <MoreHorizIcon onClick={() => setMenuOpen(!menuOpen)} />
          {menuOpen && post.userId === currentUser.id && (
            <button onClick={handleDelete}>Delete</button>
          )}
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={"./upload/" + post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {isPending ? (
              "Loading"
            ) : data.includes(currentUser.id) ? (
              <FavoriteOutlinedIcon
                style={{ color: "red" }}
                onClick={handleLike}
              />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={handleLike} />
            )}
            {data?.length} likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            {<TextsmsOutlinedIcon />}
            Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;
