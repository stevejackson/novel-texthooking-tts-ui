class TextsController < ApplicationController
  before_action :set_text, only: %i[ show edit update destroy ]

  # GET /texts
  def index
    @texts = Text.all
  end

  # GET /texts/1
  def show
  end

  # GET /texts/new
  def new
    @text = Text.new
  end

  # GET /texts/1/edit
  def edit
  end

  # POST /texts
  def create
    @text = Text.new(text_params)

    if @text.save
      redirect_to @text, notice: "Text was successfully created."
    else
      render :new, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /texts/1
  def update
    if @text.update(text_params)
      redirect_to @text, notice: "Text was successfully updated.", status: :see_other
    else
      render :edit, status: :unprocessable_entity
    end
  end

  # DELETE /texts/1
  def destroy
    @text.destroy!
    redirect_to texts_path, notice: "Text was successfully destroyed.", status: :see_other
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_text
      @text = Text.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def text_params
      params.expect(text: [ :name, :language, :content ])
    end
end
