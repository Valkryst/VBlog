class PostsController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update, :destroy]

  # GET /posts
  # GET /posts.json
  def index
    @categories = Category.all
  end

  # GET /posts/1
  # GET /posts/1.json
  def show
    if @post.deleted
      redirect_to(posts_path)
    end
  end

  # GET /posts/new
  def new
    authorize!(:new, Post)

    @post = Post.new
  rescue CanCan::AccessDenied
    redirect_to(posts_path)
  end

  # GET /posts/1/edit
  def edit
    authorize!(:edit, @post)
  rescue CanCan::AccessDenied
    redirect_to(posts_path)
  end

  # POST /posts
  # POST /posts.json
  def create
    authorize!(:new, Post)

    @post = Post.new

    if params[:post][:category]
      category = Category.find_by(title: params[:post][:category])
      @post.category = category if category.present?
    end

    @post.user = current_user
    @post.title = params[:post][:title]
    @post.description = params[:post][:description]
    @post.body_html = params[:post][:body_html]
    @post.index_html = generate_index_html(params[:post][:body_html])

    respond_to do |format|
      if @post.save
        format.html { redirect_to @post, notice: 'Post was successfully created.' }
        format.json { render :show, status: :created, location: @post }
      else
        format.html { render :new }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  rescue CanCan::AccessDenied
    redirect_to(posts_path)
  end

  # PATCH/PUT /posts/1
  # PATCH/PUT /posts/1.json
  def update
    if params[:post][:category]
      category = Category.find_by(title: params[:post][:category])
      @post.category = category if category.present?
    end

    @post.title = params[:post][:title] if params[:post][:title]
    @post.description = params[:post][:description] if params[:post][:description]
    @post.body_html = params[:post][:body_html] if params[:post][:body_html]
    @post.index_html = generate_index_html(params[:post][:body_html]) if params[:post][:body_html]

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

  # DELETE /posts/1
  # DELETE /posts/1.json
  def destroy
    authorize!(:destroy, @post)

    @post.deleted = true
    @post.save

    respond_to do |format|
      format.html { redirect_to(posts_path) }
      format.json { head :no_content }
    end
  rescue CanCan::AccessDenied
    redirect_to(posts_path)
  end

  private
    def generate_index_html(html)
      index_html = ''
      Nokogiri::HTML(params[:post][:body_html]).css("h2").map do |tag|
        puts tag.inspect
        index_html << "<li><a href=\"##{tag.text}\">#{tag.text}</a></li>"
      end
      index_html
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def post_params
      params.require(:post).permit(:title, :description, :body_html, :category)
    end
end
