source 'https://rubygems.org'

gem "fastlane"
# You may use http://rbenv.org/ or https://rvm.io/ to install and use this version
ruby '2.7.4'

gem 'cocoapods', '~> 1.11', '>= 1.11.3'

plugins_path = File.join(File.dirname(__FILE__), 'fastlane', 'Pluginfile')
eval_gemfile(plugins_path) if File.exist?(plugins_path)
