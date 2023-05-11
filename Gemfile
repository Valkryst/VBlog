source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.0.0'

# Allows loading environment variables from the `.env` file in the root directory.
gem 'dotenv-rails'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 7.0.4'
gem 'pg'
# Use Puma as the app server
gem 'puma', '~> 6.2'
# Use SCSS for stylesheets
gem 'sass-rails', '>= 6'
# Transpile app-like JavaScript. Read more: https://github.com/rails/webpacker

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.4.3', require: false

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'listen', '>= 3.0.5', '< 3.9'
  gem 'web-console', '>= 3.3.0'
end

group :test do
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '>= 2.15'
  gem 'selenium-webdriver'
  # Easy installation and use of web drivers to run system tests with browsers
  gem 'webdrivers'
end

gem 'acts-as-taggable-on', '~> 9.0'

# For user registration, login, and permissions.
gem 'devise', github: 'heartcombo/devise', branch: 'main'
gem 'omniauth-rails_csrf_protection'
gem 'omniauth-github', github: 'omniauth/omniauth-github', branch: 'master'

gem 'cancancan'

gem 'sitemap_generator'
gem "importmap-rails", "~> 1.1"
