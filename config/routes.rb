Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  devise_scope :user do
    get 'sign_in', :to => 'devise/sessions#new', :as => :new_user_session
    delete 'sign_out', :to => 'devise/sessions#destroy', :as => :destroy_user_session
  end

  root 'posts#index'

  get 'login/show'

  resources :categories, only: [:index]
  resources :posts
  resources :users, only: [:index, :show, :edit, :create, :update]
end
