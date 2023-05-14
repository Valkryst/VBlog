## Local Setup

Create a `.envrc` file as follows, filling out the variables as necessary:

```shell
export DATABASE_USERNAME=postgres
export DATABASE_PASSWORD=password
export DATABASE_HOST=db
export DATABASE_PORT=5432

export GITHUB_KEY=
export GITHUB_SECRET=

export RAILS_ENV=development
```

```shell
docker compose build
docker compose up -d
```

## Production Setup

Create a `.envrc` file as follows, filling out the variables as necessary:

```shell
export AWS_S3_ACCESS_KEY_ID=
export AWS_S3_BUCKET_NAME=
export AWS_S3_REGION=
export AWS_S3_SECRET_ACCESS_KEY=

export DATABASE_USERNAME=postgres
export DATABASE_PASSWORD=
export DATABASE_HOST=localhost
export DATABASE_PORT=5432

export GITHUB_KEY=
export GITHUB_SECRET=

export RACK_ENV=production
export RAILS_ENV=production
export RAILS_LOG_TO_STDOUT=enabled
export SECRET_KEY_BASE=
```

```shell
docker-compose build
docker compose up -d
```

## Database

### Export

```shell
docker compose exec db pg_dump -U $DATABASE_USERNAME -h $DATABASE_HOST -p $DATABASE_PORT -d vblog_development --file /tmp/latest.dump
docker cp $(docker ps --filter "publish=$DATABASE_PORT" --format "{{.ID}}"):/tmp/latest.dump ./latest.dump
```

### Import

Ensure that the databases are empty and that they exist:

```shell
docker compose exec app rake db:drop db:create
````

Import the database dump:

```shell
docker cp ./latest.dump $(docker ps --filter "publish=$DATABASE_PORT" --format "{{.ID}}"):/tmp/latest.dump
docker compose exec db psql -U $DATABASE_USERNAME -d vblog_development -f /tmp/latest.dump
```

## ImportMap Misc.

* Check for security issues using `./bin/importmap audit`.
* Check for updates using `./bin/importmap outdated`.


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