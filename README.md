## Local Setup

Create a `.envrc` file as follows, filling out the variables as necessary:

```
export DATABASE_USERNAME=postgres
export DATABASE_PASSWORD=password
export DATABASE_HOST=db
export DATABASE_PORT=5432

export GITHUB_KEY=
export GITHUB_SECRET=
```

```shell
asdf plugin add direnv
asdf install direnv latest
asdf local direnv latest
asdf direnv setup --shell bash --version latest

docker compose build
```

## Production Setup

Create a `.envrc` file as follows, filling out the variables as necessary:

```
ex[ort AWS_S3_ACCESS_KEY_ID=
export AWS_S3_BUCKET_NAME=
export AWS_S3_REGION=
export AWS_S3_SECRET_ACCESS_KEY=

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