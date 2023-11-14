@posts.each do |post|
    json.set! post.id do
        json.extract! post, :id, :author_id, :body
        json.author post.author.first_name
        json.author2 post.author.last_name
    end
end

  