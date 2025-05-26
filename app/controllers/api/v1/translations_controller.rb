class Api::V1::TranslationsController < Api::V1::ApiController
  def fetch
    translated_text = TranslationApiWrapper.new(service: "deepl",
                                                content_language: params[:content_language],
                                                translation_language: params[:translation_language],
                                                text: params[:text])
                                           .translate

    render json: { translated_text: translated_text }
  end
end