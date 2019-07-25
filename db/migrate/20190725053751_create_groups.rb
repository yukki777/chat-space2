class CreateGroups < ActiveRecord::Migration[5.0]
  def change
    create_table :groups do |t|
      t.string :name, null: false
      # NOTNULL制約　カラだと保存しない
      t.index :name, unique: true
      # 一異性制約　同じ内容を保存しない
      t.timestamps
    end
  end
end
