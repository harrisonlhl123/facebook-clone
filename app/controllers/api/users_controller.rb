require "open-uri"

class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password']

  def create
    @user = User.new(user_params)

    set_default_pfp unless @user.pfp.attached?
    set_default_cover unless @user.cover.attached?

    if @user.save
      login!(@user)
      render :show
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  def search
    query = params[:query]
    @users = User.where('first_name ILIKE ? OR last_name ILIKE ?', "%#{query}%", "%#{query}%").limit(8)
    render :search    
  end

  def index
    @users = User.all
    render :index
  end

  private

  def user_params
    params.require(:user).permit(:email, :first_name, :last_name, :birthday, :gender, :password, :bio, :pfp, :cover)
  end

  def set_default_pfp
    @user.pfp.attach(io: URI.open('https://instabook-seeds.s3.amazonaws.com/default.png'), filename: 'default.png')
  end

  def set_default_cover
    @user.cover.attach(io: URI.open('https://instabook-seeds.s3.amazonaws.com/cover-photo.jpeg'), filename: 'cover-photo.jpeg')
  end
end
