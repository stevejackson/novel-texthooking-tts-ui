class Api::V1::TtsController < Api::V1::ApiController
  def fetch
    permitted = params.permit(:text, :voice_id)
    tts_file_url = TtsMakerApiWrapper.new.fetch_tts(text: permitted[:text])

    render json: { tts_file_url: tts_file_url }
  end
end