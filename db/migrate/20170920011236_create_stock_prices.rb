class CreateStockPrices < ActiveRecord::Migration[5.0]
  def change
    create_table :stock_prices do |t|
      t.integer :close_price_cents, default: 0, null: false, limit: 8
      t.string :close_price_currency, default: "USD", null: false
      t.integer :open_price_cents, default: 0, null: false, limit: 8
      t.string :open_price_currency, default: "USD", null: false
      t.integer :low_price_cents, default: 0, null: false, limit: 8
      t.string :low_price_currency, default: "USD", null: false
      t.integer :high_price_cents, default: 0, null: false, limit: 8
      t.string :high_price_currency, default: "USD", null: false
      t.integer :volume, default: 0, null: false, limit: 8
      t.string :ticker
      t.integer :stock_id, null: false
      t.date :date
      t.timestamps null: false
    end
  end
end
