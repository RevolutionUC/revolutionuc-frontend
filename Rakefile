task default: %w[dev]

task :dev do
  sh "bundle exec jekyll serve --livereload"
end

task :serve do
  sh "bundle exec jekyll serve"
end

task :build do
  sh "bundle exec jekyll build"
end

task :test do
  Rake::Task["build"].invoke
  sh "bundle exec htmlproofer ./_site"
end