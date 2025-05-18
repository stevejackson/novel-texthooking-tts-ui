# https://pro.ttsmaker.com/api-platform/api-docs-v2

# curl -X 'POST' \
#   'https://api.ttsmaker.com/v2/create-tts-order' \
#   -H 'accept: application/json' \
#   -H 'Content-Type: application/json' \
#   -d '{
#   "api_key": "TEST",
#   "text": "商店会开一个好价钱。",
#   "voice_id": 1501,
#   "audio_format": "mp3",
#   "audio_speed": 1,
#   "audio_volume": 1,
#   "audio_pitch": 1,
#   "audio_high_quality": 0,
#   "text_paragraph_pause_time": 0,
#   "emotion_style_key": "",
#   "emotion_intensity": 1
# }'


# response
# {
#   "error_code": 0,
#   "error_summary": "",
#   "msg": "TTS Task Executed Successfully",
#   "user_email": "steve@sjackson.net",
#   "tts_task_characters_count": 10,
#   "audio_download_url": "https://s2v1.ttsmaker-vip-file.com/file/2025-04-29-102103_157538.mp3",
#   "audio_download_backup_url": "https://ttsmaker-file2.com/s2v1/file/2025-04-29-102103_157538.mp3",
#   "audio_file_format": "mp3",
#   "current_timestamp": 1745893265,
#   "audio_file_expiration_timestamp": 1745979665,
#   "account_status": {
#     "quota_characters": 1000000,
#     "characters_used": 10,
#     "available_quota": 999990,
#     "subscription_period": "month",
#     "subscription_next_reset_timestamp": 1748484836
#   }
# }
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