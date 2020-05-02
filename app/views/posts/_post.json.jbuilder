json.extract! post, :id, :title, :body_html, :created_at, :updated_at
json.url post_url(post, format: :json)
