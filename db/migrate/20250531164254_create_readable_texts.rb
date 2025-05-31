class CreateReadableTexts < ActiveRecord::Migration[8.0]
  def change
    create_table :readable_texts do |t|
      t.string :name
      t.string :language
      t.text :content

      t.timestamps
    end
  end
end
