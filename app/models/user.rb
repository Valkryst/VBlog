class User < ApplicationRecord
  ROLES = %i[admin author reader]

  devise :omniauthable, :trackable, omniauth_providers: %i[github]

  has_many :posts

  validates :name, presence: true

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.name = auth.info.name
      user.avatar_url = auth.info.image
    end

    user = User.where(provider: auth.provider, uid: auth.uid).first
    user.avatar_url = auth.info.image if user.avatar_url != auth.info.image

    user
  end
end
