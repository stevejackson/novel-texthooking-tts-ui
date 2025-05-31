require 'rails_helper'

RSpec.describe "texts/edit", type: :view do
  let(:text) {
    Text.create!(
      name: "MyString",
      language: "MyString",
      content: "MyText"
    )
  }

  before(:each) do
    assign(:text, text)
  end

  it "renders the edit text form" do
    render

    assert_select "form[action=?][method=?]", text_path(text), "post" do

      assert_select "input[name=?]", "text[name]"

      assert_select "input[name=?]", "text[language]"

      assert_select "textarea[name=?]", "text[content]"
    end
  end
end
