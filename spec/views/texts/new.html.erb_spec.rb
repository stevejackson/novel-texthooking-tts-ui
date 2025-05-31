require 'rails_helper'

RSpec.describe "texts/new", type: :view do
  before(:each) do
    assign(:text, Text.new(
      name: "MyString",
      language: "MyString",
      content: "MyText"
    ))
  end

  it "renders new text form" do
    render

    assert_select "form[action=?][method=?]", texts_path, "post" do

      assert_select "input[name=?]", "text[name]"

      assert_select "input[name=?]", "text[language]"

      assert_select "textarea[name=?]", "text[content]"
    end
  end
end
