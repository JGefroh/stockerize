FROM mhart/alpine-node:6.11.3 AS builder

RUN apk add --no-cache \
    bash \
    curl \
    python=2.7.12-r0 \
    make \
    gcc \
    git \
    g++ \
    vim

RUN npm install -g bower
RUN npm install -g brunch

COPY ./frontend/package.json /stockerize/frontend/package.json
WORKDIR /stockerize/frontend/
RUN npm install

COPY ./frontend/bower.json /stockerize/frontend/bower.json
WORKDIR /stockerize/frontend/
RUN bower install --allow-root

COPY ./frontend /stockerize/frontend

WORKDIR /stockerize/frontend/
RUN brunch build --production

FROM alpine:3.4 AS release

RUN apk add --update \
    bash \
    build-base \
    curl \
    file \
    git \
    nodejs \
    openssl-dev \
    readline-dev \
    vim \
    wget \
    zlib-dev

# Timezone set to Honolulu
RUN apk add --update \
    tzdata \
&&  cp /usr/share/zoneinfo/Pacific/Honolulu /etc/localtime

ENV PATH /usr/local/rbenv/shims:/usr/local/rbenv/bin:$PATH
ENV RBENV_ROOT /usr/local/rbenv
ENV RUBY_VERSION 2.3.2
ENV CONFIGURE_OPTS --disable-install-doc
ENV BUILD_PACKAGES \
    linux-headers \
    imagemagick-dev \
    qt-webkit \
    xvfb \
    libffi-dev \
    postgresql-dev \
    libffi-dev

RUN apk add --update $BUILD_PACKAGES
RUN rm -rf /var/cache/apk/*

RUN git clone --depth 1 git://github.com/sstephenson/rbenv.git ${RBENV_ROOT} \
&&  git clone --depth 1 https://github.com/sstephenson/ruby-build.git ${RBENV_ROOT}/plugins/ruby-build \
&&  git clone --depth 1 git://github.com/jf/rbenv-gemset.git ${RBENV_ROOT}/plugins/rbenv-gemset \
&&  ${RBENV_ROOT}/plugins/ruby-build/install.sh

RUN echo 'eval "$(rbenv init -)"' >> /etc/profile.d/rbenv.sh \
&&  echo 'eval "$(rbenv init -)"' >> /root/.bashrc

RUN rbenv install $RUBY_VERSION \
&&  rbenv global $RUBY_VERSION

RUN mkdir /app

RUN apk add --update \
    build-base \
    imagemagick \
    libffi-dev \
    libxslt-dev \
    qt-dev

RUN gem install bundler tzinfo-data

COPY Gemfile /app/
COPY Gemfile.lock /app/


WORKDIR /app
RUN bundle install --path vendor/bundle
COPY . /app
COPY --from=builder /stockerize/frontend/public /app/public
CMD bundle exec foreman start
