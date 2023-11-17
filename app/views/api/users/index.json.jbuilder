@users.each do |user|
    friends_id_arr = user.initiated_friendships.pluck(:friend_id)

    json.set! user.id do
        json.extract! user, :id, :email, :first_name, :last_name, :birthday, :gender, :created_at, :updated_at

        json.friends friend_id_arr
    end
end