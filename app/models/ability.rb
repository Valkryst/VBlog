# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    if user&.role == 'admin'
      initialize_admin(user)
    elsif user&.role == 'author'
      initialize_author(user)
    elsif user&.role == 'reader'
      initialize_reader(user)
    end

    can(:index, Post)
    can(:show, Post)
  end

  def initialize_admin(user)
    can(:manage, :all)
    can(:update_user_roles, User)

    initialize_author(user)
  end

  def initialize_author(user)
    can(:new, Post)
    can(:edit, Post, user_id: user.id)

    initialize_reader(user)
  end

  def initialize_reader(user)
    can(:show, User, :id => user.id)
    can(:edit, User, :id => user.id)
  end
end
