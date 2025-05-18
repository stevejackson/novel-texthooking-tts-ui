# frozen_string_literal: true

Rails.application.routes.draw do
  root to: "dashboard#index"

  resources :dashboard, only: [:index]
  resources :texthooker, only: [:index]

  namespace :api do
    namespace :v1 do
      resources :tts, only: [] do
        collection do
          post 'fetch'
        end
      end
    end
  end
end
