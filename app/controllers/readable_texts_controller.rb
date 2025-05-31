class ReadableTextsController < ApplicationController
  before_action :set_readable_text, only: %i[ show edit update destroy ]

  # GET /readable_texts
  def index
    @readable_texts = ReadableText.all
  end

  # GET /readable_texts/1
  def show
  end

  # GET /readable_texts/new
  def new
    @readable_text = ReadableText.new
  end

  # GET /readable_texts/1/edit
  def edit
  end

  # POST /readable_texts
  def create
    @readable_text = ReadableText.new(readable_text_params)

    if @readable_text.save
      redirect_to @readable_text, notice: "Readable text was successfully created."
    else
      render :new, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /readable_texts/1
  def update
    if @readable_text.update(readable_text_params)
      redirect_to @readable_text, notice: "Readable text was successfully updated.", status: :see_other
    else
      render :edit, status: :unprocessable_entity
    end
  end

  # DELETE /readable_texts/1
  def destroy
    @readable_text.destroy!
    redirect_to readable_texts_path, notice: "Readable text was successfully destroyed.", status: :see_other
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_readable_text
      @readable_text = ReadableText.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def readable_text_params
      params.expect(readable_text: [ :name, :language, :content ])
    end
end
