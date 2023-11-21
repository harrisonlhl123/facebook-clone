json.user do
    json.extract! @user, :id, :email, :first_name, :last_name, :birthday, :gender, :created_at, :updated_at
    json.pfp @user.pfp.attached? ? @user.pfp.url : nil
    json.cover @user.cover.attached? ? @user.cover.url : nil
end