task default: %w[serve]

task :serve do
  sh "bundle exec jekyll serve --watch"
end

task :build do
  sh "bundle exec jekyll build"
end

task :test do
  Rake::Task["build"].invoke
  sh "bundle exec htmlproofer ./_site"
end