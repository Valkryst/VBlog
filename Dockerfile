FROM ruby:3.0.0

WORKDIR /root/app
SHELL [ "/bin/bash", "-c" ]

# Install dependencies
RUN apt update -qq
RUN apt install -y git


# Install Ruby Dependencies
COPY Gemfile Gemfile.lock ./

RUN gem install bundler
RUN bundle install --jobs $(getconf _NPROCESSORS_ONLN)


# Misc.
RUN mkdir -p tmp/pids
RUN rails assets:precompile