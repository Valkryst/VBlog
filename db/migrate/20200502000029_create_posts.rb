class CreatePosts < ActiveRecord::Migration[6.0]
  def change
    create_table :posts do |t|
      t.string :title
      t.text :body_html, default: ''
      t.boolean :deleted, default: false

      t.timestamps
    end
  end
end
