class Api::FriendsController < ApplicationController

    def create
        @friend = Friend.new(friend_params)

        if @friend.save
            render json:{success: "You are now friends"}, status: 200
        else
            render json: { errors: @friend.errors.full_messages }, status: 422
        end
    end


    def destroy
        @friend = Friend.find(params[:id])
        if @friend
            @friend.destroy
        else
            render json: { errors: @friend.errors.full_messages }, status: 422
        end
    end

    private
    def friend_params 
        params.require(:friend).permit(:user_id, :friend_id)
    end


end