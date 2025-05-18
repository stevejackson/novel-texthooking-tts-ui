# Rails Template

Rails 8.0 application template that includes TailwindCSS, Stimulus and Vite.

A variant with minimal magic link authentication is available on the [`features/user-authentication`](https://github.com/grascovit/rails-template/tree/features/user-authentication) branch. To get started, follow the instructions in `README.md`.

### Instructions

1. Clone this repository (replace `your-project-name`)

```
git clone --depth=1 --branch=main git@github.com:grascovit/rails-template.git your-project-name && cd your-project-name && rm -rf .git .github
```

2. Run `bin/rails app:template LOCATION=https://gist.githubusercontent.com/grascovit/4e1e8d6b49ab62ad45ac19165686afad/raw/771452dbf9555be852e6a19f99e544e218a768d3/rails_template.rb` to replace the placeholder name with your project's name.
3. Be sure to confirm the domain at `app/mailer/application_mailer.rb`.
4. Remember to set the credentials from your email service in `config/environments/production.rb` before deploying.
5. Run the project with `foreman start -f Procfile.dev`.

Remember to run `bundle install` if you change your `Gemfile` or `yarn install` if you change your `package.json`.

### Tools

#### [RSpec](https://github.com/rspec/rspec-rails)
You can run your test suite with `bundle exec rspec`.

#### [Rubocop](https://github.com/rubocop/rubocop)
Static code analyzer that can be run with `rubocop --require rubocop-rails` (or `rubocop --require rubocop-rails -A` to apply Rubocop's suggestions).

You can also tweak its settings in `.rubocop.yml`.

#### [Pry](https://github.com/pry/pry)
Runtime developer console very useful to debug that can be used by inserting `binding.pry` in the code.

To use it, run the app with `rails s` in one terminal and `bin/vite dev` in another instead of using `foreman start -f Procfile.dev`.

#### [dotenv](https://github.com/bkeepers/dotenv)
Load environment variables that can be accessed via `ENV`. Create the `.env` file and define it like `VARIABLE_NAME=123`.
