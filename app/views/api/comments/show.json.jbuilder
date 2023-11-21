json.extract! @comment, :id, :user_id, :post_id, :body
json.user @comment.user.first_name
json.user2 @comment.user.last_name
json.pfp @comment.user.pfp.attached? ? @comment.user.pfp.url : nil