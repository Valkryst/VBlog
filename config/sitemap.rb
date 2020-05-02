require 'aws-sdk-s3'

SitemapGenerator::Sitemap.default_host = "http://valkryst.com"
SitemapGenerator::Sitemap.sitemaps_host = "https://site-valkryst.s3.amazonaws.com"

SitemapGenerator::Sitemap.adapter = SitemapGenerator::AwsSdkAdapter.new(
    ENV['AWS_S3_BUCKET_NAME'],
    aws_access_key_id: ENV['AWS_S3_ACCESS_KEY_ID'],
    aws_secret_access_key: ENV['AWS_S3_SECRET_ACCESS_KEY'],
    aws_region: ENV['AWS_S3_REGION']
)

SitemapGenerator::Sitemap.create do
  add(root_path)
  add(posts_path)

  Post.all.each do |post|
    add(post_path(post), changefreq: 'weekly', lastmod: post.updated_at)
  end
end