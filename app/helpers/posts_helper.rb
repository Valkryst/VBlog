module PostsHelper
  def posts_in_chronological_order(categories)
    posts = []

    categories.each do |category|
      category.posts.each{ |p| posts << p}
    end

    posts.sort_by{ |post| post.created_at }.reverse!
  end
end
