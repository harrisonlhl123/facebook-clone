class Api::CommentsController < ApplicationController
    # wrap_parameters include: Comment.attribute_names + ["post_id", "user_id"]
    
    def create
        @comment = Comment.new(comment_params)
        @comment.user_id = params[:user_id]
        @comment.post_id = params[:post_id]
        # debugger

        if @comment.save
            # @post = Post.find(params[:post_id])
            render :show
        else
            render json: { errors: @comment.errors.full_messages }, status: 422
        end
    end

    def destroy
        @comment = Comment.find(params[:id])
        @comment.destroy
        render json: @comment
    end

    def update
        @comment = Comment.find(params[:id])

        if @comment.update(comment_params)
            render :show
        else
            render json: @comment.errors.full_messages, status: 422
        end
    end

    def index
        if params[:post_id]
            @comments = Comment.where(:post_id == params[:post_id])
        else
            @comments = Comment.all
        end

        render :index
    end

    def show
        @comment = Comment.find(params[:id])
        render :show
    end

    private

    def comment_params
        params.require(:comment).permit(:user_id, :post_id, :body)
    end
end