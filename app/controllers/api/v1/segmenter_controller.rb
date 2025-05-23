class Api::V1::SegmenterController < Api::V1::ApiController
  def segment_paragraphs
    paragraphs = params[:paragraphs]

    segmented_paragraphs = paragraphs.map do |paragraph|
      PragmaticSegmenter::Segmenter.new(text: paragraph).segment
    end

    render json: { paragraphs:  segmented_paragraphs }
  end
end