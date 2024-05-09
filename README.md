## Local Setup

Create a `.envrc` file as follows, filling out the variables as necessary:

```shell
export DATABASE_USERNAME=postgres
export DATABASE_PASSWORD=password
export DATABASE_PORT=5432

export GITHUB_KEY=
export GITHUB_SECRET=

export RAILS_ENV=development
```

```shell
podman compose build
podman compose up -d
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
podman compose exec db pg_dump -U $DATABASE_USERNAME -h db -p $DATABASE_PORT -d vblog_development --file /tmp/latest.dump
```

### Import

Ensure that the databases are empty and that they exist:

```shell
podman compose exec app rake db:drop db:create
````

Import the database dump:

```shell
podman compose exec db psql -U postgres -d vblog_development -f /tmp/latest.dump
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