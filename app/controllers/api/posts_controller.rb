module Api
  class PostsController < ApiController
    def index
      @posts = Post.all

      render json: @posts
    end

    def create
      @post = Post.create(post_params)

      render json: @post
    end

    private

    def post_params
      params.require(:post).permit(:title, :body)
    end
  end
end