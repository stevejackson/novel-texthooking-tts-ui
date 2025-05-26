class Api::V1::TtsController < Api::V1::ApiController
  def fetch
    tts_file_url = TtsMakerApiWrapper.new.fetch_tts(text: params[:text], voice_id: params[:voice_id])

    render json: { tts_file_url: tts_file_url }
  end
end