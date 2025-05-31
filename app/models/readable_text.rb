class ReadableText < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  validates :language, presence: true, inclusion: { in: %w(EN ZH), message: "%{value} is not a valid language." }
  validates :content, presence: true

  def segmented_paragraphs
    paragraphs = content.split("\n")
                        .reject(&:blank?)

    segmented_paragraphs = paragraphs.map do |paragraph|
      PragmaticSegmenter::Segmenter.new(text: paragraph).segment
    end

    segmented_paragraphs
  end
end
