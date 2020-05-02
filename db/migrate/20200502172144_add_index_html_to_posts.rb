class AddIndexHtmlToPosts < ActiveRecord::Migration[6.0]
  def change
    add_column :posts, :index_html, :string
  end
end
