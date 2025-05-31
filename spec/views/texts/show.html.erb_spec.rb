require 'rails_helper'

RSpec.describe "texts/show", type: :view do
  before(:each) do
    assign(:text, Text.create!(
      name: "Name",
      language: "Language",
      content: "MyText"
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Name/)
    expect(rendered).to match(/Language/)
    expect(rendered).to match(/MyText/)
  end
end
