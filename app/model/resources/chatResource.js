export default function chatResource(model) {
  return {
    chat_id: model?._id,
    user_id: model?.user_id,
    history: model?.history,
    createdAt: model?.createdAt,
    chat_name: model?.chat_name
  }
}