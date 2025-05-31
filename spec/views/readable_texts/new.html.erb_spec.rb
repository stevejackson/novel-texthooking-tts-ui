require 'rails_helper'

RSpec.describe "readable_texts/new", type: :view do
  before(:each) do
    assign(:readable_text, ReadableText.new(
      name: "MyString",
      language: "MyString",
      content: "MyText"
    ))
  end

  it "renders new readable_text form" do
    render

    assert_select "form[action=?][method=?]", readable_texts_path, "post" do

      assert_select "input[name=?]", "readable_text[name]"

      assert_select "input[name=?]", "readable_text[language]"

      assert_select "textarea[name=?]", "readable_text[content]"
    end
  end
end
