# frozen_string_literal: true

Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end

  post "/graphql", to: "graphql#execute"
  root to: "dashboard#index"

  resources :dashboard, only: [:index]
  resources :novels, only: [:index, :show]
  resources :readable_texts, only: [:index, :new, :create, :edit, :update, :destroy]
  resources :settings, only: [:index]
  resources :texthooker, only: [:index]

  namespace :api do
    namespace :v1 do
      post 'segment_paragraphs', to: 'segmenter#segment_paragraphs'
      get 'fetch_translation', to: 'translations#fetch'

      resources :tts, only: [] do
        collection do
          post 'fetch'
        end
      end
    end
  end
end
