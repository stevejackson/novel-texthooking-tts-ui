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
      Rails.cache.fetch("deepl-#{@text}-#{@content_language}-#{@translation_language}", expires_in: 10.seconds) do
        fetch_from_deepl
      end
    end
  end

  private

  def fetch_from_deepl
    deepl_endpoint = Rails.application.credentials.deepl.endpoint!
    conn = Faraday.new(
      url: deepl_endpoint + "/v2/translate",
      params: {}
    ) do |f|
      f.request :json
      f.request :authorization, "DeepL-Auth-Key", Rails.application.credentials.deepl.api_key!
      f.response :json
    end

    result = conn.post do |req|
      params = {
        text: [@text],
        source_lang: source_lang_to_deepl_format(@content_language),
        target_lang: target_lang_to_deepl_format(@translation_language)
      }

      req.body = params.to_json
    end.body

    pp "Deepl API full result: "
    pp result

    result["translations"]&.first["text"]
  end

  def source_lang_to_deepl_format(lang)
    case lang
    when 'ZH-HANS'
      'ZH'
    when 'ZH-HANT'
      'ZH'
    when 'EN-US'
      'EN'
    when 'EN-GB'
      'EN'
    else
      lang
    end
  end

  def target_lang_to_deepl_format(lang)
    case lang
    when 'ZH'
      'ZH-HANS'
    when 'EN'
      'EN-US'
    else
      lang
    end
  end
end