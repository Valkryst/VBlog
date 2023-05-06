FROM ruby:3.0.0

WORKDIR /root/app
SHELL [ "/bin/bash", "-c" ]

# Install dependencies
RUN apt update -qq
RUN apt install -y --no-install-recommends git



# Prepare Scripts
ARG SCRIPTS_FOLDER=./scripts

COPY ./scripts $SCRIPTS_FOLDER
RUN chmod -R +x $SCRIPTS_FOLDER



# Install asdf
COPY .tool-versions $HOME

RUN git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.11.2
RUN . $SCRIPTS_FOLDER/setup_asdf.sh && . $SCRIPTS_FOLDER/install_asdf.sh



# Install Ruby Dependencies
COPY Gemfile Gemfile.lock ./
RUN gem install bundler
RUN bundle install --jobs 4



# Install Node Dependencies
COPY package.json ./
RUN . $SCRIPTS_FOLDER/setup_asdf.sh && npm install --local yarn


# Install Yarn Dependencies
RUN . $SCRIPTS_FOLDER/setup_asdf.sh && yarn install
RUN rails webpacker:install
RUN rails webpacker:compile


# Misc.
RUN mkdir -p tmp/pids
RUN . $SCRIPTS_FOLDER/setup_asdf.sh && rails assets:precompile