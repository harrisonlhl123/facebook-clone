friends = @current_user.friends
friend_ids = friends.pluck(:id)


json.set! @current_user.id do
    json.extract! @current_user, :id, :email, :first_name, :last_name, :birthday, :gender, :created_at, :updated_at
    json.pfp @current_user.pfp.attached? ? @current_user.pfp.url : nil
    json.cover @current_user.cover.attached? ? @current_user.cover.url : nil
    json.friend_ids friend_ids
end

friends.each do |friend|
    json.set! friend.id do
        json.extract! friend, :id, :first_name, :last_name
        json.pfp friend.pfp.attached? ? friend.pfp.url : nil
        json.cover friend.cover.attached? ? friend.cover.url : nil
    end
end
