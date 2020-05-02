class Post < ApplicationRecord
  acts_as_taggable_on :tags

  belongs_to :user

  validates :user, presence: true
  validates :title, presence: true
  validates :index_html, presence: true
  validates :body_html, presence: true
end
