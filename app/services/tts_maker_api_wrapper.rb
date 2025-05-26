class TtsMakerApiWrapper
  def initialize()
    super

    @base_api_url = "https://api.ttsmaker.com/v2"
  end

  def fetch_tts(text:, voice_id: 1501)
    conn = Faraday.new(
      url: @base_api_url + "/create-tts-order",
      params: {}
    ) do |f|
      f.request :json
      f.response :json
    end

    result = conn.post do |req|
      params = {
        api_key: Rails.application.credentials.tts_maker.api_key!,
        text: text,
        voice_id: voice_id,
        audio_format: "mp3",
        audio_speed: 1,
        audio_volume: 1,
        audio_pitch: 1,
        audio_high_quality: 0,
        text_paragraph_pause_time: 0,
        emotion_style_key: "",
        emotion_intensity: 1
      }

      req.body = params.to_json
    end.body

    result["audio_download_url"]
  end
end