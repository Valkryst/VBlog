# Deployment

Install PostgreSQL and set up superuser.

```bash
# Install PostgreSQL
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
RELEASE=$(lsb_release -cs)
echo "deb http://apt.postgresql.org/pub/repos/apt/ ${RELEASE}"-pgdg main | sudo tee  /etc/apt/sources.list.d/pgdg.list
sudo apt-get update
sudo apt-get -y install postgresql-14

# Change postgres DB user password:
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'CHANGE_ME';"

# Add the user, who will run the server, as a PostgreSQL superuser to avoid
# errors when running the server.
sudo -u postgres createuser --superuser USERNAME_HERE
sudo -u postgres psql

# The previous command will put you in the PostgreSQL CLI. Type the following
# commands.
\password USERNAME_HERE
\q
```

Clone the repository and enter it, then set up `rvm` and install whichever
version of Ruby the project is currently using.

Create `.env` file as follows, filling out the variables as necessary, and then
load it using `source .env`.

```bash
sudo apt install rbenv

# Update your .bashrc file, following instructions from this command.
rbenv init

# Verify installation by running the following command.
curl -fsSL https://github.com/rbenv/rbenv-installer/raw/main/bin/rbenv-doctor | bash

rbenv install 2.7.0
rbenv local 2.7.0
```

Create `.env` file as follows, filling out the variables as necessary, and then
load it using `source .env`.

```
# Use these if you're working locally.
DATABASE_USERNAME=
DATABASE_PASSWORD=
DATABASE_HOST=
DATABASE_PORT=
GITHUB_KEY=
GITHUB_SECRET=

# Use these if you're running the server.
export DATABASE_USERNAME=postgres
export DATABASE_PASSWORD=
export DATABASE_HOST=localhost
export DATABASE_PORT=5432
export GITHUB_KEY=
export GITHUB_SECRET=
export LANG=en_US.UTF-8
export RACK_ENV=production
export RAILS_ENV=production
export RAILS_LOG_TO_STDOUT=enabled
export RAILS_SERVE_STATIC_FILES=enabled
export SECRET_KEY_BASE=
```

Install dependencies.

```bash
# Node's tutorial doesn't recommend installing it VIA apt.
sudo apt install nodejs npm libpq-dev
npm install --local yarn

# Install gems and precompile all assets.
bundle install
rails assets:precompile
```

Create the database.

```bash
rails db:create db:migrate
```

Run the server.

```bash
rails s -p PORT_NUMBER_HERE
```

# Acknowledgements

## Artwork

* [Freepik](https://www.flaticon.com/authors/freepik)
  * [icon_posts.svg](https://github.com/Valkryst/VBlog/blob/master/app/assets/images/icon_posts.svg)
  * [icon_log_in.svg](https://github.com/Valkryst/VBlog/blob/master/app/assets/images/icon_log_in.svg)
  * [icon_navbar.svg](https://github.com/Valkryst/VBlog/blob/master/app/assets/images/icon_navbar.svg)
  * [icon_new_post.svg](https://github.com/Valkryst/VBlog/blob/master/app/assets/images/icon_new_post.svg)
* [prettycons](https://www.flaticon.com/authors/prettycons)
  * [icon_home.svg](https://github.com/Valkryst/VBlog/blob/master/app/assets/images/icon_home.svg)
* [rss.com](https://rss.com/)
  * [icon_rss.png](https://rss.com/blog/free-rss-icon/)