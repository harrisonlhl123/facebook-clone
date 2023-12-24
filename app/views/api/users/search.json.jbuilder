json.users ({})

json.users do 
    @users.each do |user|
        json.set! user.id do
            json.extract! user, :id, :email, :first_name, :last_name, :birthday, :gender, :bio, :pfp, :cover, :created_at, :updated_at
            # json.coverUrl user.cover.attached? ? user.cover.url : "https://facespace-fs-seeds.s3.amazonaws.com/cover_photo_default.jpg"
            # json.avatarUrl user.avatar.attached? ? user.avatar.url : "https://facespace-fs-seeds.s3.amazonaws.com/profile_pic_default1.jpg"
            json.pfp user.pfp.attached? ? user.pfp.url : nil
        end
    end
end