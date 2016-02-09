FROM heroku/nodejs

# Install ruby & ruby-dev
RUN apt-get update && apt-get install -y \
    ruby \
    ruby-dev

# Install sass and compass gems
RUN gem install sass --no-ri --no-rdoc && \
    gem install compass --no-ri --no-rdoc

# Install Bower & Grunt
RUN npm install -g bower grunt grunt-cli

RUN grunt build
