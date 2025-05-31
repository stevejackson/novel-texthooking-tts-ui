require 'rails_helper'

RSpec.describe "readable_texts/edit", type: :view do
  let(:readable_text) {
    ReadableText.create!(
      name: "MyString",
      language: "MyString",
      content: "MyText"
    )
  }

  before(:each) do
    assign(:readable_text, readable_text)
  end

  it "renders the edit readable_text form" do
    render

    assert_select "form[action=?][method=?]", readable_text_path(readable_text), "post" do

      assert_select "input[name=?]", "readable_text[name]"

      assert_select "input[name=?]", "readable_text[language]"

      assert_select "textarea[name=?]", "readable_text[content]"
    end
  end
end
