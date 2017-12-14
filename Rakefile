task default: %w[serve]

task :serve do
  `bundle exec jekyll serve`
end

task :build do
    `bundle exec jekyll build`
end

task :test do
    Rake::Task["build"].invoke
    `bundle exec htmlproofer ./_site`
end