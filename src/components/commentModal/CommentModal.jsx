import { CreateComment, SingleComment, SinglePost } from "../";
import { Modal } from "../ui";

export default function CommentModal({ isOpen, closeModal, data }) {
  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      childrenPadding="p-0 pb-4"
      title={t("Share this post")}
      closeIcon={true}
      isFullScreen={true}
      width="sm:w-[50rem] w-full"
      children={
        <div className="grid gap-4">
          <SinglePost data={data} isFullScreen={true} closeModal={closeModal} />
          <div className="grid gap-4 px-10">
            <CreateComment />

            {data.post_comments &&
              data.post_comments.map((comment, index) => (
                <div key={index}>
                  <SingleComment isReply={comment.isReplays} data={comment} />
                </div>
              ))}
          </div>
        </div>
      }
    />
  );
}
