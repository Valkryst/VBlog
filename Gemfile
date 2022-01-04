source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.7.0'

# Allows loading environment variables from the `.env` file in the root directory.
gem 'dotenv-rails'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 6.1.4'
gem 'pg'
# Use Puma as the app server
gem 'puma', '~> 5.5'
# Use SCSS for stylesheets
gem 'sass-rails', '>= 6'
# Transpile app-like JavaScript. Read more: https://github.com/rails/webpacker
gem 'webpacker', '~> 5.4'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use Active Model has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Active Storage variant
# gem 'image_processing', '~> 1.2'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.4.3', require: false

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'listen', '>= 3.0.5', '< 3.8'
  gem 'web-console', '>= 3.3.0'
end

group :test do
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '>= 2.15'
  gem 'selenium-webdriver'
  # Easy installation and use of web drivers to run system tests with browsers
  gem 'webdrivers'
end

gem 'acts-as-taggable-on', '~> 8.1'

# For user registration, login, and permissions.
#
# The "You are using an old OmniAuth version, please ensure you have 1.0.0.pr2 version or later installed." error
# was encountered while updating a few gems. To resolve this issue, I had to change how the devise gem was specified
# below.
#
# After the previous fix was implemented, I ran into the "Attack prevented by OmniAuth::AuthenticityTokenProtection"
# error which was resolved by adding the omniauth-rails_csrf_protection gem.
#
# Sources:
#   * https://stackoverflow.com/a/65732099/13279616
#   * https://github.com/cookpad/omniauth-rails_csrf_protection
gem 'devise', github: 'heartcombo/devise', branch: 'ca-omniauth-2'
gem 'omniauth-rails_csrf_protection'
gem 'omniauth-github', github: 'omniauth/omniauth-github', branch: 'master'

gem 'cancancan'

gem 'sitemap_generator'