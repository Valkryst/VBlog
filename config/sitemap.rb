SitemapGenerator::Sitemap.default_host = "https://valkryst.com"
SitemapGenerator::Sitemap.create do
  add(root_path)
  add(posts_path)

  Post.all.each do |post|
    add(post_path(post), changefreq: 'weekly', lastmod: post.updated_at)
  end
end