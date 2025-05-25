# frozen_string_literal: true

class ApplicationController < ActionController::Base
  http_basic_authenticate_with name: Rails.application.credentials.http_basic_auth.user!,
                               password: Rails.application.credentials.http_basic_auth.password!
end
