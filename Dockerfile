FROM ruby:3.0.0

WORKDIR /root/app
SHELL [ "/bin/bash", "-c" ]

# Install dependencies
RUN apt update -qq
RUN apt install -y git



# Prepare Scripts
ARG SCRIPTS_FOLDER=./scripts

COPY ./scripts $SCRIPTS_FOLDER
RUN chmod -R +x $SCRIPTS_FOLDER



# Install asdf
COPY .tool-versions $HOME

RUN git config --global http.sslverify "false" # Fix the "server certificate verification failed. CAfile: none CRLfile: none" error

RUN git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.11.2
RUN . $SCRIPTS_FOLDER/setup_asdf.sh && . $SCRIPTS_FOLDER/install_asdf.sh



# Install Ruby Dependencies
COPY Gemfile Gemfile.lock ./

RUN gem install bundler
RUN bundle install --jobs 4



# Misc.
RUN mkdir -p tmp/pids
RUN . $SCRIPTS_FOLDER/setup_asdf.sh && rails assets:precompile