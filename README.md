# revolutionuc-frontend

[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.org/RevolutionUC/revolutionuc-frontend.svg?branch=master)](https://travis-ci.org/RevolutionUC/revolutionuc-frontend)

## Getting Started

Be sure you have [Jekyll](https://jekyllrb.com/), a static site builder, installed. You can follow [this guide](https://jekyllrb.com/docs/installation/) for installation of Ruby and Jekyll. (Note that the current recommened Ruby version is Ruby 3, and the default MacOS Ruby version is no longer recommended)

```sh
git clone https://github.com/RevolutionUC/revolutionuc-frontend.git 
cd revolutionuc-frontend
bundle install
rake #runs bundle exec jekyll serve --livereload
```

Images
```sh
magick 4x\*.jpg -resize 25% 1x\images.jpg && magick 4x\*.jpg -resize 50% 2x\images.jpg && magick 4x\*.jpg -resize 75% 3x\images.jpg
```