json.extract! @post, :id, :author_id, :feed_id, :body
json.author @post.author.first_name
json.author2 @post.author.last_name
json.pfp @post.author.pfp.attached? ? @post.author.pfp.url : nil
json.photo @post.photo.attached? ? @post.photo.url : nil
json.comment_ids @post.comments.order("updated_at DESC").pluck(:id)

