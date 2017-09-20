class CreateStockPrices < ActiveRecord::Migration[5.0]
  def change
    create_table :stock_prices do |t|
      t.monetize :close_price
      t.monetize :open_price
      t.monetize :low_price
      t.monetize :high_price
      t.integer :volume, default: 0
      t.string :ticker
      t.integer :stock_id, null: false
      t.date :date
      t.timestamps null: false
    end
  end
end
