friends = @user.friends
friend_ids = friends.pluck(:id)

json.users do
    json.set! @user.id do
        json.extract! @user, :id, :email, :first_name, :last_name, :birthday, :gender, :bio, :created_at, :updated_at
        json.pfp @user.pfp.attached? ? @user.pfp.url : nil
        json.cover @user.cover.attached? ? @user.cover.url : nil
        json.friend_ids friend_ids
    end

    friends.each do |friend|
        json.set! friend.id do
            json.extract! friend, :id, :first_name, :last_name
            json.pfp friend.pfp.attached? ? friend.pfp.url : nil
            json.cover friend.cover.attached? ? friend.cover.url : nil
        end
    end
end

json.user do 
    json.extract! @user, :id, :email, :first_name, :last_name, :birthday, :gender, :bio, :created_at, :updated_at
        json.pfp @user.pfp.attached? ? @user.pfp.url : nil
        json.cover @user.cover.attached? ? @user.cover.url : nil
        json.friend_ids friend_ids
end