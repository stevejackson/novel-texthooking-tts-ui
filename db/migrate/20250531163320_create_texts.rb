class CreateTexts < ActiveRecord::Migration[8.0]
  def change
    create_table :texts do |t|
      t.string :name
      t.string :language
      t.text :content

      t.timestamps
    end
  end
end
