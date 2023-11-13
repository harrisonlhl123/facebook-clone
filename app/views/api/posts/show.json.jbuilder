json.extract! @post, :id, :author_id, :body
json.author @post.author.first_name