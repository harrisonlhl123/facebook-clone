class Api::FriendsController < ApplicationController

    def create
        # @friend = Friend.new(friend_params)

        # if @friend.save
        #     render json:{success: "You are now friends"}, status: 200
        # else
        #     render json: { errors: @friend.errors.full_messages }, status: 422
        # end

        @friendship = Friend.create({user_id: params[:user_id], friend_id: params[:friend_id]})
        @friendship_backwards = Friend.create({user_id: params[:friend_id], friend_id: params[:user_id]})

        render :show
    end


    def destroy
        # @friend = Friend.find(params[:id])
        # if @friend
        #     @friend.destroy
        # else
        #     render json: { errors: @friend.errors.full_messages }, status: 422
        # end
        
        @friendship = Friend.find_by(user_id: params[:user_id], friend_id: params[:current_user_id])
        @friendship_backwards = Friend.find_by(user_id: params[:current_user_id], friend_id: params[:user_id])

        @friendship.destroy
        @friendship_backwards.destroy
   
        render :show
    end

    def index
        @friends = current_user.friends
        render :index
    end

    private
    def friend_params 
        params.require(:friend).permit(:user_id, :friend_id)
    end


end