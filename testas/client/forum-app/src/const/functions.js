import { patchLikesPostsUser } from "../../api/usersApi";
import { toast } from "react-hot-toast";

export const handleLikedPost = async (userId, postId, postLikes) => {
  try {
    const response = await patchLikesPostsUser(userId, postId, postLikes);
    toast.success("Answer have been posted");
  } catch (err) {
    toast.error("Something went wrong");
  }
};
