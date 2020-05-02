# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    if user&.role == 'admin'
      initialize_admin(user)
    elsif user&.role == 'reader'
      initialize_reader(user)
    end

    can(:index, Post)
    can(:show, Post)
  end

  def initialize_admin(user)
    can(:destroy, Post)
    can(:edit, Post)
    can(:new, Post)

    initialize_reader(user)
  end

  def initialize_reader(user)
  end
end
