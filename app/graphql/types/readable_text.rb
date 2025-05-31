class Types::ReadableText < Types::BaseObject
  field :id, ID, null: false
  field :name, String, null: false
  field :content, String, null: false
  field :language, String, null: false
  field :segmented_paragraphs, [[String]], null: false
end
