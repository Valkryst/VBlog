class PostsController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update, :destroy]

  def index
    @categories = Category.all

    respond_to do |format|
      format.html
      format.rss
    end
  end

  def show
    if @post.deleted
      redirect_to(posts_path)
    end
  end

  def new
    @post = Post.new
  end

  def edit
    authorize!(:edit, @post)
  rescue CanCan::AccessDenied
    redirect_to(action: :show)
  end

  def create
    @post = Post.new

    if params[:post][:category]
      category = Category.find_by(title: params[:post][:category])
      @post.category = category if category.present?
    end

    @post.user = current_user
    @post.title = params[:post][:title]
    @post.description = params[:post][:description]
    @post.body_html = params[:post][:body_html]
    @post.tag_list = process_tags(params[:post][:tag_list])

    respond_to do |format|
      if @post.save
        format.html { redirect_to @post, notice: 'Post was successfully created.' }
        format.json { render :show, status: :created, location: @post }
      else
        format.html { render :new }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    if params[:post][:category]
      category = Category.find_by(title: params[:post][:category])
      @post.category = category if category.present?
    end

    @post.title = params[:post][:title]
    @post.description = params[:post][:description]
    @post.body_html = params[:post][:body_html]
    @post.tag_list = process_tags(params[:post][:tag_list])

    respond_to do |format|
      if @post.save
        format.html { redirect_to @post, notice: 'Post was successfully updated.' }
        format.json { render :show, status: :ok, location: @post }
      else
        format.html { render :edit }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    authorize!(:destroy, @post)

    @post.deleted = true
    @post.save

    respond_to do |format|
      format.html { redirect_to(posts_path) }
      format.json { head :no_content }
    end
  rescue CanCan::AccessDenied
    redirect_to(action: :show)
  end

  private
    def process_tags(tags = nil)
      return [] if tags.nil?
      return [] unless tags.is_a?(String)

      tags.split(',').map { |tag| tag.squish }
    end

    def set_post
      @post = Post.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def post_params
      params.require(:post).permit(:title, :description, :body_html, :category)
    end
end
