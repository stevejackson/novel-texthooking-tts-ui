module Queries
  class FetchReadableText < Queries::BaseQuery
    type Types::ReadableText, null: false
    argument :id, ID, required: true

    def resolve(id:)
      text = ReadableText.find(id)
    end
  end
end
