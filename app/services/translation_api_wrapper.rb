class TranslationApiWrapper
  def initialize(service:, text:, content_language:, translation_language:)
    @service = service
    @text = text
    @content_language = content_language
    @translation_language = translation_language
  end

  def translate
    case @service
    when "deepl"
      fetch_from_deepl
    end
  end

  private

  def fetch_from_deepl
    conn = Faraday.new(
      url: "https://api-free.deepl.com/v2/translate",
      params: {}
    ) do |f|
      f.request :json
      f.request :authorization, "DeepL-Auth-Key", Rails.application.credentials.deepl.api_key!
      f.response :json
    end

    result = conn.post do |req|
      params = {
        text: [@text],
        source_lang: @content_language,
        target_lang: @translation_language,
      }

      req.body = params.to_json
    end.body

    pp result

    result["translations"]&.first["text"]
  end
end