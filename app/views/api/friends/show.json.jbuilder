json.friends do
    json.set! @friendship.id do
        json.extract! @friendship, :id, :user_id, :friend_id, :created_at, :updated_at
    end
    json.set! @friendship_backwards.id do
        json.extract! @friendship_backwards, :id, :user_id, :friend_id, :created_at, :updated_at
    end
end