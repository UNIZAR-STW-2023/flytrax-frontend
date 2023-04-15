import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/router";
import { ForoItem, ForoForm, CommentFeed } from "../../../components";
import { foroData } from "../../../assets/dummy/dummyDatos";
import { useParams } from "react-router-dom";

const PostDetails = () => {
  const router = useRouter();
  //const { postId } = router.query;
  const params = useParams();

  const postId = 1;

  const [fetchedPost, setFetchedPost] = useState(null);

  useEffect(() => {
    if (!router.isReady) return;
    for (let i = 0; i < foroData.length; i++) {
      if (foroData[i].id === postId) {
        setFetchedPost(foroData[i]);
      }
    }
  }, [router.query.name, router.isReady]);

  //const fetchedPost = foroData.length > 0 ? getPostById(postId) : null;

  return (
    <>
      {!fetchedPost ? (
        <div className="flex justify-center items-center h-full">
          <ClipLoader color="lightblue" size={80} />
        </div>
      ) : (
        <div>
          <ForoItem data={fetchedPost} />
          <ForoForm postId={postId} placeHolder="Escribe tu respuesta" />
          <CommentFeed comments={fetchedPost?.comments} />
        </div>
      )}
    </>
  );
};

export default PostDetails;
