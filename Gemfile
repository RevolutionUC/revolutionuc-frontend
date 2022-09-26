source "https://rubygems.org"

# Use `bundle exec jekyll serve` to start the dev server

gem "jekyll", "4.2.2"
gem "webrick", "~> 1.7"
gem "html-proofer", "4.4.1"

group :jekyll_plugins do
    gem "jekyll-sitemap", "1.4.0"
    gem "bourbon", "7.2.0"
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# Extra gem for compatibility with Windows when listening for file changes
gem 'wdm', '~> 0.1.1', :install_if => Gem.win_platform?