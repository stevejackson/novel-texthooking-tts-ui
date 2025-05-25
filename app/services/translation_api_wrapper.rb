class TranslationApiWrapper
  def initialize(service:, text:)
    @service = service
    @text = text
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
        source_lang: "EN",
        target_lang: "ZH-HANS",
      }

      req.body = params.to_json
    end.body

    pp result

    result["translations"]&.first["text"]
  end
end