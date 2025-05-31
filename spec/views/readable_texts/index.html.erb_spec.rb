require 'rails_helper'

RSpec.describe "readable_texts/index", type: :view do
  before(:each) do
    assign(:readable_texts, [
      ReadableText.create!(
        name: "Name",
        language: "Language",
        content: "MyText"
      ),
      ReadableText.create!(
        name: "Name",
        language: "Language",
        content: "MyText"
      )
    ])
  end

  it "renders a list of readable_texts" do
    render
    cell_selector = 'div>p'
    assert_select cell_selector, text: Regexp.new("Name".to_s), count: 2
    assert_select cell_selector, text: Regexp.new("Language".to_s), count: 2
    assert_select cell_selector, text: Regexp.new("MyText".to_s), count: 2
  end
end
