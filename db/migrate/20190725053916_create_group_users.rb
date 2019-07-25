class CreateGroupUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :group_users do |t|
      t.references :group, foreign_key: true
      t.references :user, foreign_key: true
      # 外部キー制約　user group　に対応するテーブルがなければ保存しない

      t.timestamps
    end
  end
end
