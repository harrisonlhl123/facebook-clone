class Api::SessionsController < ApplicationController
  # def show
  #   if current_user
  #     @user = current_user
  #     render 'api/users/show'
  #   else
  #     render json: { user: nil }
  #   end
  # end

  # def create
  #   @user = User.find_by_credentials(params[:email], params[:password])

  #   if @user
  #     login!(@user)
  #     render 'api/users/show'
  #   else
  #     render json: { errors: ['The provided credentials were invalid.'] }, 
  #       status: :unauthorized
  #   end
  # end

  # def destroy
  #   logout!
  #   render json: { message: 'success' }
  # end

  def show
    if current_user
      render json: { user: current_user }
    else
      render json: { user: nil }
    end
  end

  def create
    email = params[:email]
    password = params[:password]

    @user = User.find_by_credentials(email, password)

    if @user
      login!(@user)
      render json: { user: @user }
    else
      render json: { errors: ['The provided credentials were invalid.'] }, status: :unauthorized
    end
  end

  def destroy
    if current_user
      logout!
      render json: { message: 'success' }
    else
      render json: { message: 'success' }
    end
  end


end
