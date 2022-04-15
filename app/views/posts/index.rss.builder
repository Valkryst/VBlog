xml.instruct!(:xml, version: '1.0')

xml.rss(version: '2.0') do
  xml.channel do
    # Required Channel Elements
    xml.title("Valkryst's Blog")
    xml.description('Documentation for some of my projects along with essays, technical articles, and thought pieces covering a variety of topics.')
    xml.link(posts_url)

    # Optional Channel Elements
    xml.language('en-us')
    xml.copyright("© Copyright 2014-#{Date.today.year} Valkryst, All Rights Reserved")
    xml.managingEditor('admin@valkryst.com (Valkryst)')
    xml.webMaster('admin@valkryst.com (Valkryst)')
    xml.lastBuildDate(Post.maximum(:updated_at)&.rfc822)
    xml.docs('https://cyber.harvard.edu/rss/rss.html')
    xml.image do
      xml.url(asset_url('favicon.png'))
      xml.title("Valkryst's Blog")
      xml.link(posts_url)
    end

    posts_in_chronological_order(@categories).each do |post|
      xml.item do
        xml.title(post.title)
        xml.link(post_url(post))
        xml.description(post.description)
        xml.author('admin@valkryst.com (Valkryst)')
        xml.category(post.category.title)
        post.tag_list.each do |tag|
          xml.category(tag)
        end
        xml.guid(post_url(post))
        xml.pubDate(post.created_at.rfc822)
      end
    end
  end
end