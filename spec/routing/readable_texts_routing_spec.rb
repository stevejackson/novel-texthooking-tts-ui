require "rails_helper"

RSpec.describe ReadableTextsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/readable_texts").to route_to("readable_texts#index")
    end

    it "routes to #new" do
      expect(get: "/readable_texts/new").to route_to("readable_texts#new")
    end

    it "routes to #show" do
      expect(get: "/readable_texts/1").to route_to("readable_texts#show", id: "1")
    end

    it "routes to #edit" do
      expect(get: "/readable_texts/1/edit").to route_to("readable_texts#edit", id: "1")
    end


    it "routes to #create" do
      expect(post: "/readable_texts").to route_to("readable_texts#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/readable_texts/1").to route_to("readable_texts#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/readable_texts/1").to route_to("readable_texts#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/readable_texts/1").to route_to("readable_texts#destroy", id: "1")
    end
  end
end
